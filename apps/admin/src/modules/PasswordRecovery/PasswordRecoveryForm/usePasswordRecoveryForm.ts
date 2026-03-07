import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useResponseMessage } from '../../../hooks';
import { IPasswordRecoveryForm, PasswordRecoveryFormStatus } from './types';
import { passwordRecoveryFormSchema } from './schema';
import { defaultDataToForm, formDataToMaster } from './helpers';
import { passwordRecoveryFormStatusKeys } from './enums';

export const usePasswordRecoveryForm = () => {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<PasswordRecoveryFormStatus | null>(null);

  const { vid } = useViewContext();
  const { onError } = useResponseMessage();
  const { userPasswordRecoveryRequestMutation } = useUserQuery();
  const form = useForm<IPasswordRecoveryForm>({
    resolver: zodResolver(passwordRecoveryFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const { mutate: onRequest } = userPasswordRecoveryRequestMutation;

  const formId = `password-recovery-form-${vid}`;

  const resetHandler = () => {
    form.reset(defaultDataToForm());
    setStatus(null);
  };

  const submitHandler: SubmitHandler<IPasswordRecoveryForm> = (data) => {
    const master = formDataToMaster(
      data,
      'user-password-recovery',
      `${window.location.href}/token/`
    );

    setStatus(null);
    setProcessing(true);

    onRequest(master, {
      onSuccess: ({
        userId,
        requestCreated,
        tokenCreated,
        emailCreated,
        emailSend,
      }) => {
        if (userId === 0) {
          setStatus(passwordRecoveryFormStatusKeys.noEmail);
        } else {
          if (requestCreated && tokenCreated && emailCreated && emailSend) {
            setStatus(passwordRecoveryFormStatusKeys.emailSend);
          } else {
            if (!requestCreated)
              setStatus(passwordRecoveryFormStatusKeys.noRequestCreated);
            if (!tokenCreated)
              setStatus(passwordRecoveryFormStatusKeys.noTokenCreated);
            if (!emailCreated)
              setStatus(passwordRecoveryFormStatusKeys.noEmailCreated);
            if (!emailSend)
              setStatus(passwordRecoveryFormStatusKeys.noEmailSend);
          }
        }

        setProcessing(false);
      },
      onError: (err) => {
        onError(err);
        setProcessing(false);
      },
    });
  };

  return {
    form,
    formId,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    processing,
    status,
  };
};
