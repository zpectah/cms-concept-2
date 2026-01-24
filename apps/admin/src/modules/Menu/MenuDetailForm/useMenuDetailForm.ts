import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, MenuDetail } from '@model';
import { useResponseMessage, useSelectOptions } from '../../../hooks';
import { useMenuQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { IMenuDetailForm } from './types';
import { menuDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useMenuDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IMenuDetailForm>({
    resolver: zodResolver(menuDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const {
    menuQuery,
    menuDetailQuery,
    menuCreateMutation,
    menuPatchMutation,
    menuDeleteMutation,
  } = useMenuQuery({ id });

  const formId = 'menu-detail-form';

  const { refetch } = menuQuery;
  const { data: detail } = menuDetailQuery;
  const { mutate: onCreate } = menuCreateMutation;
  const { mutate: onPatch } = menuPatchMutation;
  const { mutate: onDelete } = menuDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm());
  };

  const createHandler = (master: MenuDetail) => {
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

  const patchHandler = (master: MenuDetail) => {
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

  const submitHandler = (data: IMenuDetailForm) => {
    if (!data) return;

    // TODO: unique validation

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
    return id === 'new' ? t('views:menu.new') : detail?.name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  const resetHandler = useCallback(() => {
    if (id === 'new') {
      form.reset(defaultDataToForm());
    } else if (detail) {
      form.reset(detailDataToForm(detail));
    }
  }, [id, detail, form]);

  useEffect(() => {
    if (id || detail) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  return {
    id,
    form,
    title: drawerTitle,
    formId,
    // Actions
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onDelete: deleteHandler,
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.menu),
    },
    // Values
    values: {
      id: form.watch('id'),
      uid: form.watch('uid'),
      updated: form.watch('updated'),
    },
  };
};
