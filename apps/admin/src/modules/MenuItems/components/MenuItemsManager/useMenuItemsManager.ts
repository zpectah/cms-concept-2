import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { MenuItemsDetail } from '@model';
import { useAppStore } from '../../../../store';
import { useMenuItemsQuery } from '../../../../query';
import { useResponseMessage } from '../../../../hooks';

export const useMenuItemsManager = (menuId: number | undefined) => {
  const [detail, setDetail] = useState<number | 'new' | null>(null);

  const { t } = useTranslation(['common']);
  const { addToast, setConfirmDialog } = useAppStore();
  const { onError } = useResponseMessage();
  const queryClient = useQueryClient();
  const {
    menuItemsCreateMutation,
    menuItemsPatchMutation,
    menuItemsToggleMutation,
    menuItemsDeleteMutation,
    menuItemsDeletePermanentMutation,
  } = useMenuItemsQuery({});

  const { mutate: onCreate } = menuItemsCreateMutation;
  const { mutate: onPatch } = menuItemsPatchMutation;
  const { mutate: onToggle } = menuItemsToggleMutation;
  const { mutate: onDelete } = menuItemsDeleteMutation;
  const { mutate: onDeletePermanent } = menuItemsDeletePermanentMutation;

  const detailHandler = (detail: number | 'new') => setDetail(detail);

  /** Using this instead of refetch() */
  // TODO: make query keys available
  const reloadHandler = () =>
    queryClient.invalidateQueries({
      queryKey: ['menuitems', `menuitems-menu`, menuId],
    });

  const createHandler = (master: MenuItemsDetail) => {
    onCreate(master, {
      onSuccess: ({ id }) => {
        addToast({
          title: t('message.success.create', { count: id ? 1 : 0 }),
          severity: 'success',
          autoclose: true,
        });
        setDetail(null);
        reloadHandler();
      },
      onError,
    });
  };

  const patchHandler = (master: MenuItemsDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: 'success',
          autoclose: true,
        });
        setDetail(null);
        reloadHandler();
      },
      onError,
    });
  };

  const toggleHandler = (id: number) => {
    const master = [id];

    onToggle(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        reloadHandler();
      },
      onError,
    });
  };

  const deleteConfirmHandler = (id: number) => {
    const master = [id];

    onDelete(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.delete', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        reloadHandler();
      },
      onError,
    });
  };

  const deletePermanentConfirmHandler = (id: number) => {
    const master = [id];

    onDeletePermanent(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.deletePermanent', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        reloadHandler();
      },
      onError,
    });
  };

  const deleteHandler = (id: number) => {
    setConfirmDialog({
      title: t('message.confirm.delete.title'),
      content: t('message.confirm.delete.content', {
        subject: t('plurals.items.item', { count: 1 }),
      }),
      onConfirm: () => deleteConfirmHandler(id),
      context: 'delete',
    });
  };

  const deletePermanentHandler = (id: number) => {
    setConfirmDialog({
      title: t('message.confirm.delete.title'),
      content: t('message.confirm.delete.content', {
        subject: t('plurals.items.item', { count: 1 }),
      }),
      onConfirm: () => deletePermanentConfirmHandler(id),
      context: 'delete',
    });
  };

  return {
    detailOpen: detail,
    setDetailOpen: setDetail,
    rowActions: {
      onDetail: detailHandler,
      onCreate: createHandler,
      onPatch: patchHandler,
      onToggle: toggleHandler,
      onDelete: deleteHandler,
      onDeletePermanent: deletePermanentHandler,
    },
  };
};
