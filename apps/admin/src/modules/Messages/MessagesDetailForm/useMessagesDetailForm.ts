import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonProps } from '@mui/material';
import { modelKeys } from '@model';
import { useResponseMessage, useSelectOptions } from '../../../hooks';
import { useMessagesQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { IMessagesDetailForm } from './types';
import { messagesDetailFormSchema } from './schema';
import { defaultDataToForm, detailDataToForm } from './helpers';

export const useMessagesDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IMessagesDetailForm>({
    resolver: zodResolver(messagesDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const {
    messagesQuery,
    messagesDetailQuery,
    messagesReadMutation,
    messagesDeleteMutation,
  } = useMessagesQuery({ id });

  const { refetch } = messagesQuery;
  const { data: detail } = messagesDetailQuery;
  const { mutate: onRead } = messagesReadMutation;
  const { mutate: onDelete } = messagesDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm());
  };

  const readHandler = (id: string | undefined) => {
    if (!id || id === 'new') return;

    const master = [Number(id)];

    onRead(master, {
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
    return id === 'new' ? t('views:messages.new') : detail?.subject;
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
    // Actions
    onClose: closeHandler,
    onDelete: deleteHandler,
    onRead: readHandler,
    // Custom actions
    customActions: [
      {
        children: t('button.markAsRead'),
        variant: 'contained',
        onClick: () => readHandler(id),
        disabled: id === 'new',
      },
    ] as ButtonProps[],
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.messages),
    },
    // Values
    values: {},
  };
};
