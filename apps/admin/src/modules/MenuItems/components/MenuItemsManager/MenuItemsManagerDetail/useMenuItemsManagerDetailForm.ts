import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, MenuItemsItem } from '@model';
import { useDetailFormLocales, useSelectOptions } from '../../../../../hooks';
import { useMenuItemsQuery } from '../../../../../query';
import { useModelValidations } from '../../../../../validation';
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

  const { t } = useTranslation(['common', 'form']);
  const {
    menuId,
    menuPrefix,
    detailOpen,
    setDetailOpen,
    rowActions: { onCreate, onPatch, onDelete },
  } = useMenuItemsManagerContext();
  const { getTypeFieldOptions } = useSelectOptions();
  const { menuItemsQuery, menuItemsDetailQuery } = useMenuItemsQuery({
    id: detailOpen,
    menuId: menuId,
  });
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const { isAttributeUnique } = useModelValidations();
  const form = useForm<IMenuItemsDetailForm>({
    defaultValues: defaultDataToForm(locales, menuId ?? 0, menuPrefix),
    resolver: zodResolver(menuItemsDetailFormSchema),
  });

  const formId = 'menu-items-detail-form';

  const { data: menuItemsItems } = menuItemsQuery;
  const { data: detailData, isLoading } = menuItemsDetailQuery;

  const submitHandler: SubmitHandler<IMenuItemsDetailForm> = (data) => {
    if (!data) return;

    if (
      !isAttributeUnique<MenuItemsItem>(
        menuItemsItems ?? [],
        'name',
        data as MenuItemsItem
      )
    ) {
      form.setError('name', {
        message: t('form:message.error.duplicity_name'),
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
    if (!detailOpen) return;

    if (detailOpen === 'new') {
      form.reset(defaultDataToForm(locales, menuId ?? 0, menuPrefix));
    } else if (detailData) {
      form.reset(detailDataToForm(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen, detailData, menuId, isLoading]);

  const detailTitle = useMemo(
    () => (detailOpen === 'new' ? t('button.new.menuItems') : detailData?.name),
    [t, detailOpen, detailData]
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
