import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, pagesMetaRobotsKeysArray, PagesDetail } from '@model';
import {
  useDetailFormLocales,
  useResponseMessage,
  useSelectOptions,
} from '../../../hooks';
import { usePagesQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { IPagesDetailForm } from './types';
import { pagesDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const usePagesDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions, getTranslatedOptionsFromList } =
    useSelectOptions();
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const form = useForm<IPagesDetailForm>({
    resolver: zodResolver(pagesDetailFormSchema),
    defaultValues: defaultDataToForm(locales),
  });

  const {
    pagesQuery,
    pagesDetailQuery,
    pagesCreateMutation,
    pagesPatchMutation,
    pagesDeleteMutation,
  } = usePagesQuery({
    id,
  });

  const { refetch } = pagesQuery;
  const { data: detail } = pagesDetailQuery;
  const { mutate: onCreate } = pagesCreateMutation;
  const { mutate: onPatch } = pagesPatchMutation;
  const { mutate: onDelete } = pagesDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm(locales));
  };

  const createHandler = (master: PagesDetail) => {
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

  const patchHandler = (master: PagesDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const submitHandler = (data: IPagesDetailForm) => {
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
          severity: 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const drawerTitle = useMemo(() => {
    return id === 'new' ? t('views:pages.new') : detail?.name;
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
      type: getTypeFieldOptions(modelKeys.pages),
      metaRobots: getTranslatedOptionsFromList(
        pagesMetaRobotsKeysArray,
        'robots'
      ),
    },
  };
};
