import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useResponseMessage } from '../../../hooks';
import { useBlacklistQuery } from '../../../query';
import { BlacklistDetail } from '@model';

export const useSettingsBlacklist = () => {
  const [detailId, setDetailId] = useState<number | 'new' | null>(null);

  const { t } = useTranslation(['common']);
  const { addToast, setConfirmDialog } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    blacklistQuery,
    blacklistCreateMutation,
    blacklistPatchMutation,
    blacklistToggleMutation,
    blacklistDeleteMutation,
    blacklistDeletePermanentMutation,
  } = useBlacklistQuery({});

  const { data: items, refetch, isLoading } = blacklistQuery;
  const { mutate: onCreate } = blacklistCreateMutation;
  const { mutate: onPatch } = blacklistPatchMutation;
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
        setDetailId(null);
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: BlacklistDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: 'success',
          autoclose: true,
        });
        setDetailId(null);
        refetch();
      },
      onError,
    });
  };

  const toggleHandler = (ids: number[]) => {
    const master = [...ids];

    onToggle(master, {
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

  const deleteConfirmHandler = (ids: number[]) => {
    const master = [...ids];

    onDelete(master, {
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

  const deletePermanentConfirmHandler = (ids: number[]) => {
    const master = [...ids];

    onDeletePermanent(master, {
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

  const deleteHandler = (ids: number[]) => {
    setConfirmDialog({
      title: t('message.confirm.delete.title'),
      content: t('message.confirm.delete.content', {
        subject: t('plurals.items.item', { count: ids.length }),
      }),
      onConfirm: () => deleteConfirmHandler(ids),
      context: 'delete',
    });
  };

  const deletePermanentHandler = (ids: number[]) => {
    setConfirmDialog({
      title: t('message.confirm.delete.title'),
      content: t('message.confirm.delete.content', {
        subject: t('plurals.items.item', { count: ids.length }),
      }),
      onConfirm: () => deletePermanentConfirmHandler(ids),
      context: 'delete',
    });
  };

  return {
    items: items ? [...items] : [],
    rowActions: {
      onCreate: createHandler,
      onPatch: patchHandler,
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
    detail: {
      detail: detailId,
      onDetail: setDetailId,
    },
  };
};
