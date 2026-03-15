import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, CategoriesDetail, CategoriesItem } from '@model';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { useModelValidations } from '../../../validation';
import {
  useDetailFormLocales,
  useResponseMessage,
  useSelectOptions,
} from '../../../hooks';
import { useCategoriesQuery } from '../../../query';
import { ICategoriesDetailForm } from './types';
import { categoriesDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useCategoriesDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views', 'form']);
  const { addToast } = useAppStore();
  const { rootUrl, vid } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const { isAttributeUnique } = useModelValidations();
  const form = useForm<ICategoriesDetailForm>({
    resolver: zodResolver(categoriesDetailFormSchema),
    defaultValues: defaultDataToForm(locales),
  });

  const {
    categoriesQuery,
    categoriesDetailQuery,
    categoriesCreateMutation,
    categoriesPatchMutation,
    categoriesDeleteMutation,
  } = useCategoriesQuery({
    id,
  });

  const formId = `categories-detail-form__${vid}`;

  const { data: categories, refetch } = categoriesQuery;
  const { data: detail } = categoriesDetailQuery;
  const { mutate: onCreate } = categoriesCreateMutation;
  const { mutate: onPatch } = categoriesPatchMutation;
  const { mutate: onDelete } = categoriesDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm(locales));
  };

  const createHandler = (master: CategoriesDetail) => {
    onCreate(master, {
      onSuccess: ({ id }) => {
        closeHandler();
        addToast({
          title: t('message.success.create', { count: id ? 1 : 0 }),
          severity: 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: CategoriesDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const submitHandler = (data: ICategoriesDetailForm) => {
    if (!data) return;

    if (
      !isAttributeUnique<CategoriesItem>(
        categories ?? [],
        'name',
        data as CategoriesItem
      )
    ) {
      form.setError('name', {
        message: t('form:message.error.duplicity_name'),
      });

      return;
    }

    const master = formDataToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const deleteHandler = (id: number) => {
    if (!id) return;

    const master = [Number(id)];

    onDelete(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
        addToast({
          title: t('message.success.delete', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const drawerTitle = useMemo(() => {
    return id === 'new' ? t('views:categories.new') : detail?.name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  const resetHandler = useCallback(() => {
    if (id === 'new') {
      form.reset(defaultDataToForm(locales));
    } else if (detail) {
      form.reset(detailDataToForm(detail));
    }
  }, [id, detail, form, locales]);

  useEffect(() => {
    if (id || detail) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  return {
    id,
    form,
    formId,
    title: drawerTitle,
    // Actions
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onDelete: deleteHandler,
    // Locales
    localesTabs: {
      locales,
      locale,
      onLocaleChange,
    },
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.categories),
    },
    // Values
    values: {
      id: form.watch('id'),
    },
  };
};
