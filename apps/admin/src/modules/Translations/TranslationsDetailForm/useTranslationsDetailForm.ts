import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  modelKeys,
  translationsNamespaceKeysArray,
  TranslationsDetail,
} from '@model';
import {
  useDetailFormLocales,
  useResponseMessage,
  useSelectOptions,
} from '../../../hooks';
import { useTranslationsQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { ITranslationsDetailForm } from './types';
import { translationsDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useTranslationsDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions, getTranslatedOptionsFromList } =
    useSelectOptions();
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const form = useForm<ITranslationsDetailForm>({
    resolver: zodResolver(translationsDetailFormSchema),
    defaultValues: defaultDataToForm(locales),
  });

  const {
    translationsQuery,
    translationsDetailQuery,
    translationsCreateMutation,
    translationsPatchMutation,
    translationsDeleteMutation,
  } = useTranslationsQuery({
    id,
  });

  const formId = 'translations-detail-form';

  const { refetch } = translationsQuery;
  const { data: detail } = translationsDetailQuery;
  const { mutate: onCreate } = translationsCreateMutation;
  const { mutate: onPatch } = translationsPatchMutation;
  const { mutate: onDelete } = translationsDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm(locales));
  };

  const createHandler = (master: TranslationsDetail) => {
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

  const patchHandler = (master: TranslationsDetail) => {
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

  const submitHandler = (data: ITranslationsDetailForm) => {
    if (!data) return;

    // TODO: unique validation

    // TODO: add user as editor

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
      type: getTypeFieldOptions(modelKeys.translations),
      namespace: getTranslatedOptionsFromList(
        translationsNamespaceKeysArray,
        'namespace'
      ),
    },
    // Values
    values: {},
  };
};
