import { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys } from '@model';
import { useBlacklistQuery } from '../../../../query';
import { useSelectOptions } from '../../../../hooks';
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

  const {
    detail,
    setDetail,
    rowActions: { onCreate, onPatch, onDelete },
  } = useSettingsBlacklistContext();
  const { getTypeFieldOptions } = useSelectOptions();
  const { blacklistDetailQuery } = useBlacklistQuery({
    id: detail ? String(detail) : undefined,
  });
  const form = useForm<ISettingsBlacklistDetailForm>({
    resolver: zodResolver(settingsBlacklistDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const { data: detailData, isLoading } = blacklistDetailQuery;

  const submitHandler: SubmitHandler<ISettingsBlacklistDetailForm> = (data) => {
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
    if (detail) {
      setOpen(true);
      resetHandler();
    } else {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, isLoading]);

  useEffect(() => {
    if (!open) setTimeout(() => setDetail(null), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    open,
    setOpen,
    form,
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
