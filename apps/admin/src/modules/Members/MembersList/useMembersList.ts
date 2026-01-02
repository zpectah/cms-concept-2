import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useMembersQuery } from '../../../query';
import { useResponseMessage } from '../../../hooks';

export const useMembersList = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    membersQuery,
    membersToggleMutation,
    membersDeleteMutation,
    membersDeletePermanentMutation,
  } = useMembersQuery({});

  const { data: items, refetch, isLoading } = membersQuery;
  const { mutate: onToggle } = membersToggleMutation;
  const { mutate: onDelete } = membersDeleteMutation;
  const { mutate: onDeletePermanent } = membersDeletePermanentMutation;

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
