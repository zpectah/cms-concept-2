import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { metaRobotsKeysArray } from '@common';
import { modelKeys } from '@model';
import { useSelectOptions, useUserActions } from '../../../hooks';
import { useAppStore } from '../../../store';
import { useSettingsQuery } from '../../../query';
import { ISettingsClientForm } from './types';
import { detailDataToForm, formDataToMaster } from './helpers';
import { SettingsClientFormSchema } from './schema';

export const useSettingsClientForm = () => {
  const { t } = useTranslation(['common']);
  const { groups } = useUserActions(modelKeys.settings);
  const { addToast } = useAppStore();
  const { settingsQuery, settingsPatchMutation } = useSettingsQuery();
  const { getTranslatedOptionsFromList } = useSelectOptions();
  const form = useForm<ISettingsClientForm>({
    defaultValues: detailDataToForm(),
    resolver: zodResolver(SettingsClientFormSchema),
  });

  const { data: settingsData } = settingsQuery;
  const { mutate: onPatch } = settingsPatchMutation;

  const submitHandler: SubmitHandler<ISettingsClientForm> = (data, event) => {
    if (!groups.system.modify) return;
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
      onError: (err) => {
        // TODO
        console.warn(err);
      },
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
    options: {
      metaRobots: getTranslatedOptionsFromList(metaRobotsKeysArray, 'robots'),
    },
  };
};
