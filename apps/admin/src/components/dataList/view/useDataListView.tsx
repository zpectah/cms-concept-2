import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import {
  IconEye,
  IconEyeCancel,
  IconTrash,
  IconTrashX,
  IconTrashOff,
  IconCopy,
  IconVocabulary,
  IconVocabularyOff,
  IconRosette,
  IconRosetteDiscountCheckFilled,
  IconPencil,
} from '@tabler/icons-react';
import {
  contentModelKeysArray,
  ContentModelNames,
  CommonModelItemProps,
} from '@model';
import { useAppStore } from '../../../store';
import { useUserActions } from '../../../hooks';
import { IconButtonPlus, IconButtonPlusProps } from '../../ui';
import { FavoriteStar } from '../../button';
import { useDataListContext } from '../DataList.context';

export const useDataListView = <T extends CommonModelItemProps>() => {
  const navigate = useNavigate();
  const { setConfirmDialog } = useAppStore();
  const { actions: userActions } = useUserActions();
  const { model, root, rowActions } = useDataListContext();

  const iconSize = '1.25rem';

  const renderFavoriteStar = useCallback(
    (id: string | number | undefined) => {
      if (!model || !id) return null;

      const isModelValid = contentModelKeysArray.includes(model);

      if (!isModelValid) return null;

      return (
        <FavoriteStar model={model as ContentModelNames} id={Number(id)} />
      );
    },
    [model]
  );

  const detailHandler = useCallback(
    (id: number) => {
      if (rowActions?.onDetail === false) return;

      navigate(`${root}/id/${id}`);

      if (typeof rowActions?.onDetail === 'function')
        rowActions?.onDetail?.(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [root, rowActions]
  );

  const deleteConfirmHandler = useCallback(
    (id: number) => {
      setConfirmDialog({
        title: 'Confirm delete',
        content: `Are you sure you want delete this item?`,
        context: 'delete',
        onConfirm: () => rowActions?.onDelete?.(id),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowActions]
  );

  const deletePermanentConfirmHandler = useCallback(
    (id: number) => {
      setConfirmDialog({
        title: 'Confirm permanent delete',
        content: `Are you sure you want permanent delete this item?`,
        context: 'delete',
        onConfirm: () => rowActions?.onDeletePermanent?.(id),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowActions]
  );

  const renderRowActions = useCallback(
    (row: T) => {
      if (!row) return null;

      const actions = [
        {
          id: 'detail',
          label: 'Detail',
          icon: <IconPencil size={iconSize} />,
          onClick: (id: number) => detailHandler(id),
          disabled: !userActions.view,
          hidden: !rowActions?.onDetail,
        },
        {
          id: 'clone',
          label: 'Clone',
          icon: <IconCopy size={iconSize} />,
          onClick: (id: number) => rowActions?.onClone?.(id),
          disabled: !userActions.create,
          hidden: !rowActions?.onClone,
        },
        {
          id: 'toggle',
          label: 'Toggle',
          icon: row.active ? (
            <IconEye size={iconSize} />
          ) : (
            <IconEyeCancel size={iconSize} />
          ),
          onClick: (id: number) => rowActions?.onToggle?.(id),
          disabled: !userActions.modify,
          hidden: !rowActions?.onToggle,
          color: 'primary',
        },
        {
          id: 'approve',
          label: 'Approve',
          icon: row?.approved ? (
            <IconRosetteDiscountCheckFilled size={iconSize} />
          ) : (
            <IconRosette size={iconSize} />
          ),
          onClick: (id: number) => rowActions?.onApprove?.(id),
          disabled: !userActions.approve,
          hidden: !rowActions?.onApprove,
          color: 'primary',
        },
        {
          id: 'read',
          label: 'Read',
          icon: row?.read ? (
            <IconVocabulary size={iconSize} />
          ) : (
            <IconVocabularyOff size={iconSize} />
          ),
          onClick: (id: number) => rowActions?.onRead?.(id),
          disabled: !userActions.modify,
          hidden: !rowActions?.onRead || !row?.read,
          color: 'primary',
        },
        {
          id: 'delete',
          label: row.deleted ? 'Undelete' : 'Delete',
          icon: row.deleted ? (
            <IconTrashOff size={iconSize} />
          ) : (
            <IconTrash size={iconSize} />
          ),
          onClick: deleteConfirmHandler,
          disabled: !userActions.delete,
          hidden: !rowActions?.onDelete,
          color: 'warning',
        },
        {
          id: 'delete-permanent',
          label: 'Delete permanent',
          icon: <IconTrashX size={iconSize} />,
          onClick: deletePermanentConfirmHandler,
          disabled: !userActions.deletePermanent,
          hidden: !row.deleted || !rowActions?.onDeletePermanent,
          color: 'error',
        },
      ];

      return (
        <Stack direction="row" gap={1} alignItems="center">
          {actions.map(
            ({ label, icon, onClick, disabled, hidden, color, ...item }) => {
              if (hidden) return null;

              return (
                <IconButtonPlus
                  key={item.id}
                  tooltip={label}
                  size="small"
                  onClick={() => onClick(Number(row.id))}
                  disabled={disabled}
                  color={
                    color ? (color as IconButtonPlusProps['color']) : 'default'
                  }
                >
                  {icon}
                </IconButtonPlus>
              );
            }
          )}
        </Stack>
      );
    },
    [
      userActions,
      rowActions,
      deleteConfirmHandler,
      deletePermanentConfirmHandler,
      detailHandler,
    ]
  );

  return {
    renderFavoriteStar,
    renderRowActions,
  };
};
