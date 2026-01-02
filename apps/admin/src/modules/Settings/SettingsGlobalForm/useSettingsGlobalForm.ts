import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys } from '@model';
import { useResponseMessage, useUserActions } from '../../../hooks';
import { useAppStore } from '../../../store';
import { useSettingsQuery } from '../../../query';
import { ISettingsGlobalForm } from './types';
import { SettingsGlobalFormSchema } from './schema';
import { detailDataToForm, formDataToMaster } from './helpers';

export const useSettingsGlobalForm = () => {
  const { t } = useTranslation(['common']);
  const { groups } = useUserActions(modelKeys.settings);
  const { addToast } = useAppStore();
  const { onError } = useResponseMessage();
  const { settingsQuery, settingsPatchMutation } = useSettingsQuery();
  const form = useForm<ISettingsGlobalForm>({
    defaultValues: detailDataToForm(),
    resolver: zodResolver(SettingsGlobalFormSchema),
  });

  const { data: settingsData } = settingsQuery;
  const { mutate: onPatch } = settingsPatchMutation;

  const submitHandler: SubmitHandler<ISettingsGlobalForm> = (data, event) => {
    if (!groups.organization.modify) return;
    if (!data) return;

    const master = formDataToMaster(data);

    onPatch(master, {
      onSuccess: (res) => {
        addToast({
          title: t('message.success.dataSaved'),
          severity: 'success',
          autoclose: true,
        });
      },
      onError,
    });
  };

  useEffect(() => {
    if (settingsData) {
      if (form.formState.isDirty) return;

      form.reset(detailDataToForm(settingsData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsData]);

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
