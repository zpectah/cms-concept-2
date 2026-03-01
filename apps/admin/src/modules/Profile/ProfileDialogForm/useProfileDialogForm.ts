import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useProfile, useResponseMessage } from '../../../hooks';
import { useUserQuery } from '../../../query';
import { IProfileDialogForm } from './types';
import { profileDialogFormSchema } from './schema';
import { defaultDataToForm, formDataToMaster } from './helpers';

export const useProfileDialogForm = () => {
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const profile = useProfile();
  const { onError } = useResponseMessage();
  const { userDetailPatchMutation } = useUserQuery();
  const form = useForm<IProfileDialogForm>({
    resolver: zodResolver(profileDialogFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const formId = 'profile-detail-form';

  const { mutate: onPatch } = userDetailPatchMutation;

  const submitHandler: SubmitHandler<IProfileDialogForm> = (data, event) => {
    const master = formDataToMaster(data, profile?.user);

    onPatch(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: 'success',
          autoclose: true,
        });
      },
      onError,
    });
  };

  const resetHandler = () => {
    if (profile?.user) {
      form.reset(defaultDataToForm(profile?.user));
    }
  };

  const avatarUpdateHandler = (filename: string) => {
    form.setValue('avatar_image', filename);

    addToast({
      title: t('message.info.avatar_updated'),
      severity: 'info',
      autoclose: true,
    });
  };

  useEffect(() => {
    resetHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return {
    form,
    formId,
    profileData: profile.user,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    onAvatarUpdate: avatarUpdateHandler,
    values: {
      avatar: form.getValues('avatar_image'),
    },
  };
};
