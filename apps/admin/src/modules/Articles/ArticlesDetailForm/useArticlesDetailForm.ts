import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, ArticlesDetail } from '@model';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { getTypedDate } from '../../../utils';
import {
  useDetailFormLocales,
  useProfile,
  useResponseMessage,
  useSelectOptions,
} from '../../../hooks';
import { useArticlesQuery } from '../../../query';
import { IArticlesDetailForm } from './types';
import { articlesDetailFormSchema } from './schema';
import {
  cloneDetailDataToForm,
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useArticlesDetailForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { user } = useProfile();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const form = useForm<IArticlesDetailForm>({
    resolver: zodResolver(articlesDetailFormSchema),
    defaultValues: defaultDataToForm(locales, user.id),
  });

  const cloneId = searchParams.get('clone');
  const type = form.watch('type');
  const startDate = form.watch('event_start');

  const {
    articlesQuery,
    articlesDetailQuery,
    articlesCloneDetailQuery,
    articlesCreateMutation,
    articlesPatchMutation,
    articlesDeleteMutation,
  } = useArticlesQuery({
    id,
    cloneId,
  });

  const { refetch } = articlesQuery;
  const { data: detail } = articlesDetailQuery;
  const { data: cloneDetail } = articlesCloneDetailQuery;
  const { mutate: onCreate } = articlesCreateMutation;
  const { mutate: onPatch } = articlesPatchMutation;
  const { mutate: onDelete } = articlesDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm(locales, user.id));
  };

  const createHandler = (master: ArticlesDetail) => {
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

  const patchHandler = (master: ArticlesDetail) => {
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

  const submitHandler = (data: IArticlesDetailForm) => {
    if (!data) return;

    // TODO: unique validation

    // TODO: add user as editor

    const master = formDataToMaster(data, user.id);

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
    return id === 'new' ? t('views:articles.new') : detail?.name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  const resetHandler = useCallback(() => {
    if (id === 'new') {
      if (cloneId && cloneDetail) {
        form.reset(cloneDetailDataToForm(cloneDetail, user.id));
      } else {
        form.reset(defaultDataToForm(locales, user.id));
      }
    } else if (detail) {
      form.reset(detailDataToForm(detail));
    }
  }, [id, detail, form, locales, cloneId, cloneDetail, user]);

  useEffect(() => {
    if (id || detail || cloneDetail) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail, cloneDetail]);

  return {
    id,
    form,
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
      type: getTypeFieldOptions(modelKeys.articles),
    },
    // Values
    values: {
      id: form.watch('id'),
      type,
      minDate: getTypedDate(startDate),
    },
  };
};
