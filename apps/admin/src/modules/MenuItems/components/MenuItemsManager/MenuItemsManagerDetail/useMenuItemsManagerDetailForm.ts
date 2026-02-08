import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys } from '@model';
import { useDetailFormLocales, useSelectOptions } from '../../../../../hooks';
import { useMenuItemsQuery } from '../../../../../query';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';
import { IMenuItemsDetailForm } from './types';
import { menuItemsDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useMenuItemsManagerDetailForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    menuId,
    menuPrefix,
    detailOpen,
    setDetailOpen,
    rowActions: { onCreate, onPatch, onDelete },
  } = useMenuItemsManagerContext();
  const { getTypeFieldOptions } = useSelectOptions();
  const { menuItemsDetailQuery } = useMenuItemsQuery({ id: detailOpen });
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const form = useForm<IMenuItemsDetailForm>({
    defaultValues: defaultDataToForm(locales, menuId ?? 0, menuPrefix),
    resolver: zodResolver(menuItemsDetailFormSchema),
  });

  const formId = 'menu-items-detail-form';

  const { data: detailData, isLoading } = menuItemsDetailQuery;

  const submitHandler: SubmitHandler<IMenuItemsDetailForm> = (data) => {
    const master = formDataToMaster(data);

    if (master.id === 0) {
      onCreate(master);
    } else {
      onPatch(master);
    }
  };

  const resetHandler = useCallback(() => {
    if (!detailOpen) return;

    if (detailOpen === 'new') {
      form.reset(defaultDataToForm(locales, menuId ?? 0, menuPrefix));
    } else if (detailData) {
      form.reset(detailDataToForm(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen, detailData, menuId, isLoading]);

  const detailTitle = useMemo(
    () => (detailOpen === 'new' ? 'New item' : detailData?.uid),
    [detailOpen, detailData]
  );

  useEffect(() => {
    if (detailOpen === 'new') {
      form.reset(defaultDataToForm(locales, menuId ?? 0, menuPrefix));
    } else if (detailData) {
      form.reset(detailDataToForm(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen, detailData]);

  useEffect(() => setOpen(!!detailOpen), [detailOpen, isLoading]);

  useEffect(() => {
    if (!open) setTimeout(() => setDetailOpen(null), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    open,
    setOpen,
    detailId: detailOpen,
    detailTitle,
    formId,
    form,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    onDelete,
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.menuItems),
    },
    // Locales
    localesTabs: {
      locales,
      locale,
      onLocaleChange,
    },
    // Values
    values: {
      type: form.watch('type'),
    },
  };
};
