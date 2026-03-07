import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { getConfig } from '../../../config';
import { useUserQuery } from '../../../query';
import { useAppStore } from '../../../store';
import { useViewContext } from '../../../contexts';
import { useResponseMessage } from '../../../hooks';
import {
  IPasswordRecoveryTokenForm,
  PasswordRecoveryTokenFormStatus,
} from './types';
import { passwordRecoveryTokenFormSchema } from './schema';
import { defaultDataToForm, formDataToMaster } from './helpers';
import { passwordRecoveryTokenFormStatusKeys } from './enums';

const REDIRECT_TIMEOUT = 1250;

export const usePasswordRecoveryTokenForm = () => {
  const { routes } = getConfig();

  const [checking, setChecking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [status, setStatus] = useState<PasswordRecoveryTokenFormStatus | null>(
    null
  );

  const { t } = useTranslation(['common', 'views']);
  const navigate = useNavigate();
  const { token } = useParams();
  const { vid } = useViewContext();
  const { onError } = useResponseMessage();
  const { addToast } = useAppStore();
  const {
    userPasswordRecoveryRequestCheckMutation,
    userPasswordRecoveryTokenMutation,
  } = useUserQuery();
  const form = useForm<IPasswordRecoveryTokenForm>({
    resolver: zodResolver(passwordRecoveryTokenFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const { mutate: onCheck } = userPasswordRecoveryRequestCheckMutation;
  const { mutate: onPatch } = userPasswordRecoveryTokenMutation;

  const formId = `password-recovery-token-form-${vid}`;

  const resetHandler = () => form.reset(defaultDataToForm());

  const tokenCheckHandler = () => {
    const master = Object.assign({ token });

    setStatus(null);
    setChecking(true);

    onCheck(master, {
      onSuccess: (res) => {
        if (res.id === 0 || res.email === null) {
          setStatus(passwordRecoveryTokenFormStatusKeys.noRequest);
        } else {
          form.reset(defaultDataToForm(token, res.email));
          setStatus(passwordRecoveryTokenFormStatusKeys.ok);
        }
        setChecking(false);
        setChecked(true);
      },
      onError: (err) => {
        onError(err);
        setChecking(false);
        setStatus(passwordRecoveryTokenFormStatusKeys.error);
      },
    });
  };

  const submitHandler: SubmitHandler<IPasswordRecoveryTokenForm> = (data) => {
    const master = formDataToMaster(data);

    setProcessing(true);

    onPatch(master, {
      onSuccess: ({
        userActive,
        userUpdated,
        requestActive,
        requestUpdated,
      }) => {
        if (!userActive || !requestActive) {
          addToast({
            title: t('views:passwordRecovery.messages.error.noRequest'),
            severity: 'error',
          });
        }

        if (userUpdated && requestUpdated) {
          setRedirecting(true);

          addToast({
            title: t('views:passwordRecovery.messages.success.passwordChanged'),
            severity: 'success',
            autoclose: true,
          });

          setTimeout(() => {
            setRedirecting(false);
            navigate(routes.login.root);
          }, REDIRECT_TIMEOUT);
        }

        setProcessing(false);
      },
      onError: (err) => {
        onError(err);
        setProcessing(false);
      },
    });
  };

  useEffect(() => {
    if (token && !checked) tokenCheckHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, checked]);

  return {
    form,
    formId,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    processing,
    checking,
    redirecting,
    checked,
    status,
  };
};
