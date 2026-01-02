import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useResponseMessage } from '../../../hooks';
import { useCustomFieldsQuery } from '../../../query';

export const useCustomFieldsList = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    customFieldsQuery,
    customFieldsToggleMutation,
    customFieldsDeleteMutation,
    customFieldsDeletePermanentMutation,
  } = useCustomFieldsQuery({});

  const { data: items, refetch, isLoading } = customFieldsQuery;
  const { mutate: onToggle } = customFieldsToggleMutation;
  const { mutate: onDelete } = customFieldsDeleteMutation;
  const { mutate: onDeletePermanent } = customFieldsDeletePermanentMutation;

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
    filter: {},
    rowActions: {
      onDetail: true,
      onDelete: (id: number) => deleteHandler([id]),
      onToggle: (id: number) => toggleHandler([id]),
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
