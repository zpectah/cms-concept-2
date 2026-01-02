import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useResponseMessage } from '../../../hooks';
import { useBlacklistQuery } from '../../../query';
import { BlacklistDetail } from '@model';

export const useSettingsBlacklist = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    blacklistQuery,
    blacklistCreateMutation,
    blacklistToggleMutation,
    blacklistDeleteMutation,
    blacklistDeletePermanentMutation,
  } = useBlacklistQuery({});

  const { data: items, refetch, isLoading } = blacklistQuery;
  const { mutate: onCreate } = blacklistCreateMutation;
  const { mutate: onToggle } = blacklistToggleMutation;
  const { mutate: onDelete } = blacklistDeleteMutation;
  const { mutate: onDeletePermanent } = blacklistDeletePermanentMutation;

  const createHandler = (master: BlacklistDetail) => {
    onCreate(master, {
      onSuccess: ({ id }) => {
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

  const toggleHandler = (ids: number[]) => {
    onToggle([...ids], {
      onSuccess: ({ rows }) => {
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

  const deleteHandler = (ids: number[]) => {
    onDelete([...ids], {
      onSuccess: ({ rows }) => {
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

  const deletePermanentHandler = (ids: number[]) => {
    onDeletePermanent([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.deletePermanent', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  return {
    items: items ? [...items] : [],
    rowActions: {
      onCreate: createHandler,
      onToggle: (id: number) => toggleHandler([id]),
      onDelete: (id: number) => deleteHandler([id]),
      onDeletePermanent: (id: number) => deletePermanentHandler([id]),
    },
    selectedActions: {
      onToggleSelected: toggleHandler,
      onDeleteSelected: deleteHandler,
      onDeletePermanentSelected: deletePermanentHandler,
    },
    loading: {
      items: isLoading,
      submitting: false,
    },
  };
};
