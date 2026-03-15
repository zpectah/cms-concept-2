import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, BlacklistItem } from '@model';
import { useBlacklistQuery } from '../../../../query';
import { useSelectOptions } from '../../../../hooks';
import { useModelValidations } from '../../../../validation';
import { useSettingsBlacklistContext } from '../SettingsBlacklist.context';
import { settingsBlacklistDetailFormSchema } from './schema';
import { ISettingsBlacklistDetailForm } from './types';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useSettingsBlacklistDetailForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation(['form']);
  const {
    detail,
    setDetail,
    rowActions: { onCreate, onPatch, onDelete },
  } = useSettingsBlacklistContext();
  const { getTypeFieldOptions } = useSelectOptions();
  const { blacklistQuery, blacklistDetailQuery } = useBlacklistQuery({
    id: detail ? String(detail) : undefined,
  });
  const { isAttributeUnique } = useModelValidations();
  const form = useForm<ISettingsBlacklistDetailForm>({
    resolver: zodResolver(settingsBlacklistDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const { data: blacklistItems } = blacklistQuery;
  const { data: detailData, isLoading } = blacklistDetailQuery;

  const formId = 'settingsBlacklistDetailForm';

  const submitHandler: SubmitHandler<ISettingsBlacklistDetailForm> = (data) => {
    if (!data) return;

    if (
      !isAttributeUnique<BlacklistItem>(
        blacklistItems ?? [],
        'email',
        data as BlacklistItem
      )
    ) {
      form.setError('email', {
        message: t('form:message.error.duplicity_email_alt'),
      });

      return;
    }

    if (
      !isAttributeUnique<BlacklistItem>(
        blacklistItems ?? [],
        'ipaddress',
        data as BlacklistItem
      )
    ) {
      form.setError('ipaddress', {
        message: t('form:message.error.duplicity_ipaddress'),
      });

      return;
    }

    const master = formDataToMaster(data);

    if (master.id === 0) {
      onCreate(master);
    } else {
      onPatch(master);
    }
  };

  const resetHandler = useCallback(() => {
    if (!detail) return;

    if (detail === 'new') {
      form.reset(defaultDataToForm());
    } else if (detailData) {
      form.reset(detailDataToForm(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, detailData, isLoading]);

  useEffect(() => {
    if (detail === 'new') {
      form.reset(defaultDataToForm());
    } else if (detailData) {
      form.reset(detailDataToForm(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, detailData]);

  useEffect(() => setOpen(!!detail), [detail, isLoading]);

  useEffect(() => {
    if (!open) setTimeout(() => setDetail(null), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    open,
    setOpen,
    form,
    formId,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    onDelete,
    options: {
      type: getTypeFieldOptions(modelKeys.blacklist),
    },
    values: {
      active: form.watch('active'),
      deleted: form.watch('deleted'),
    },
    isCreate: detail === 'new',
    isUpdate: typeof detail === 'number',
  };
};
