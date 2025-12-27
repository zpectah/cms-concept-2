import { useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { ArticlesDetail } from '@model';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import {
  useDetailFormLocales,
  useProfile,
  useResponseMessage,
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
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const form = useForm<IArticlesDetailForm>({
    resolver: zodResolver(articlesDetailFormSchema),
    defaultValues: defaultDataToForm(locales, user.id),
  });

  const cloneId = searchParams.get('clone');

  const {
    articlesDetailQuery,
    articlesCloneDetailQuery,
    articlesCreateMutation,
    articlesPatchMutation,
    articlesDeleteMutation,
  } = useArticlesQuery({
    id,
    cloneId,
  });

  const { data: detail } = articlesDetailQuery;
  const { data: cloneDetail } = articlesCloneDetailQuery;
  const { mutate: onCreate } = articlesCreateMutation;
  const { mutate: onPatch } = articlesPatchMutation;
  const { mutate: onDelete } = articlesDeleteMutation;

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

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm(locales, user.id));
  };

  const createHandler = (master: ArticlesDetail) => {
    onCreate(master, {
      onSuccess: (res) => {
        // TODO: response
        console.log('on create', master, res);

        closeHandler();
        addToast({
          title: t('message.success.create', { count: 1 }),
          severity: 'success',
          autoclose: true,
        });
      },
      onError,
    });
  };

  const patchHandler = (master: ArticlesDetail) => {
    onPatch(master, {
      onSuccess: (res) => {
        // TODO: response
        console.log('on patch', master, res);

        closeHandler();
        addToast({
          title: t('message.success.update', { count: 1 }),
          severity: 'success',
          autoclose: true,
        });
      },
      onError,
    });
  };

  const submitHandler = (data: IArticlesDetailForm) => {
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
      onSuccess: (res) => {
        // TODO: response
        console.log('on create', master, res);

        closeHandler();
        addToast({
          title: t('message.success.delete', { count: 1 }),
          severity: 'success',
          autoclose: true,
        });
      },
      onError,
    });
  };

  useEffect(() => {
    if (id || detail || cloneDetail) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail, cloneDetail]);

  return {
    id,
    form,
    title: t('views:articles.detail'),
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
  };
};
