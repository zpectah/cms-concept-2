import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getConfig } from '../../../config';
import { useAppStore } from '../../../store';
import { useViewContext } from '../../../contexts';
import { useSettingsQuery, useUserQuery } from '../../../query';
import { useProfile, useResponseMessage } from '../../../hooks';
import { ILoginForm } from './types';
import { loginFormSchema } from './schema';
import { defaultDataToForm, formDataToMaster } from './helpers';

const REDIRECT_TIMEOUT = 1250;

export const useLoginForm = () => {
  const { routes } = getConfig();

  const [processing, setProcessing] = useState(false);
  const [redirectingBack, setRedirectingBack] = useState(false);

  const { t } = useTranslation(['common', 'views']);
  const [searchParams, setSearchParams] = useSearchParams();
  const { active } = useProfile();
  const { addToast } = useAppStore();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const { onError } = useResponseMessage();
  const { userLoginCheckPasswordMutation, userLoginMutation } = useUserQuery();
  const { settingsQuery } = useSettingsQuery();
  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const { mutate: onPasswordCheck } = userLoginCheckPasswordMutation;
  const { mutate: onLogin } = userLoginMutation;
  const { data: settingsData } = settingsQuery;

  const submitHandler = (data: ILoginForm) => {
    const master = formDataToMaster(data);

    setProcessing(false);

    onPasswordCheck(master, {
      onSuccess: (res) => {
        if (res.match) {
          const masterMaster = {
            email: master.email,
            id: res.id,
          };

          onLogin(masterMaster, {
            onSuccess: ({ open }) => {
              if (open) {
                setProcessing(true);

                addToast({
                  title: t('views:login.messages.success.loggingIn'),
                  severity: 'success',
                  autoclose: true,
                });

                setTimeout(() => {
                  setProcessing(false);
                  document.location = `${routes.dashboard.root}?login=success`;
                }, 500);
              } else {
                addToast({
                  title: t('views:login.messages.error.logIn'),
                  severity: 'error',
                });
              }
            },
            onError,
          });
        } else {
          if (res.id !== 0) {
            addToast({
              title: t('views:login.messages.error.credentials'),
              severity: 'error',
            });
          } else {
            addToast({
              title: t('views:login.messages.error.userNotExist'),
              severity: 'error',
            });
          }
        }
      },
      onError,
    });
  };

  const resetHandler = () => form.reset(defaultDataToForm());

  const afterLogoutHandler = () => {
    if (!searchParams.get('reason')) return;

    addToast({
      title: t('message.success.logoutSuccess'),
      severity: 'success',
      autoclose: true,
    });

    setSearchParams((state) => {
      state.delete('reason');

      return state;
    });
  };

  const expiredSessionHandler = () => {
    if (!searchParams.get('reason')) return;

    addToast({
      title: t('message.info.expiredSession'),
      severity: 'info',
      autoclose: true,
    });

    setSearchParams((state) => {
      state.delete('reason');

      return state;
    });
  };

  useEffect(() => {
    const reason = searchParams.get('reason');

    if (reason === 'logout') afterLogoutHandler();
    if (reason === 'expired-session') expiredSessionHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (active) {
      setRedirectingBack(true);
      setTimeout(() => {
        setRedirectingBack(false);
        document.location = routes.dashboard.root;
      }, REDIRECT_TIMEOUT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return {
    id,
    rootUrl,
    form,
    processing,
    redirectingBack,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    meta: {
      projectName: settingsData?.project?.name ?? '',
    },
  };
};
