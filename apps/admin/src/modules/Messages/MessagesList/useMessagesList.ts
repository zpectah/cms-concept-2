import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useResponseMessage } from '../../../hooks';
import { useMessagesQuery } from '../../../query';

export const useMessagesList = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    messagesQuery,
    messagesToggleMutation,
    messagesReadMutation,
    messagesDeleteMutation,
    messagesDeletePermanentMutation,
    onMessagesRefetch,
  } = useMessagesQuery({});

  const { data: items, isLoading } = messagesQuery;
  const { mutate: onToggle } = messagesToggleMutation;
  const { mutate: onRead } = messagesReadMutation;
  const { mutate: onDelete } = messagesDeleteMutation;
  const { mutate: onDeletePermanent } = messagesDeletePermanentMutation;

  const toggleHandler = (ids: number[]) => {
    onToggle([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        onMessagesRefetch();
      },
      onError,
    });
  };

  const readHandler = (ids: number[]) => {
    onRead([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        onMessagesRefetch();
      },
      onError,
    });
  };

  const deleteHandler = (ids: number[]) => {
    onDelete([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.delete', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        onMessagesRefetch();
      },
      onError,
    });
  };

  const deletePermanentHandler = (ids: number[]) => {
    onDeletePermanent([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.deletePermanent', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        onMessagesRefetch();
      },
      onError,
    });
  };

  return {
    items: items ? [...items] : [],
    filter: {},
    rowActions: {
      onDetail: true,
      onToggle: (id: number) => toggleHandler([id]),
      onRead: (id: number) => readHandler([id]),
      onDelete: (id: number) => deleteHandler([id]),
      onDeletePermanent: (id: number) => deletePermanentHandler([id]),
    },
    selectedActions: {
      onToggleSelected: toggleHandler,
      onReadSelected: readHandler,
      onDeleteSelected: deleteHandler,
      onDeletePermanentSelected: deletePermanentHandler,
    },
    loading: {
      items: isLoading,
      submitting: false,
    },
  };
};
