import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import {
  IconEye,
  IconEyeOff,
  IconTrash,
  IconTrashX,
  IconTrashOff,
  IconCopy,
  IconVocabulary,
  IconVocabularyOff,
  IconRosette,
  IconRosetteDiscountCheckFilled,
  IconPencil,
  IconDownload,
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
import { dataListIconSizeDefault } from '../constants';

export const useDataListView = <T extends CommonModelItemProps>() => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'model']);
  const { setConfirmDialog } = useAppStore();
  const { model, root, rowActions } = useDataListContext();
  const { actions: userActions } = useUserActions(model);

  const renderFavoriteStar = useCallback(
    (id: string | number | undefined) => {
      if (!model || !id) return null;
      if (!contentModelKeysArray.includes(model)) return null;

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
        title: t('message.confirm.delete.title'),
        content: t('message.confirm.delete.content', {
          subject: t(`model:plurals.${model}.item`, {
            count: 1,
          }).toLowerCase(),
        }),
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
        title: t('message.confirm.deletePermanent.title'),
        content: t('message.confirm.deletePermanent.content', {
          subject: t(`model:plurals.${model}.item`, {
            count: 1,
          }).toLowerCase(),
        }),
        context: 'delete',
        onConfirm: () => rowActions?.onDeletePermanent?.(id),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowActions]
  );

  const renderRowActions = useCallback(
    (row: T) => {
      if (!row.id) return null;

      const actions = [
        {
          id: 'detail',
          label: t('button.detail'),
          icon: <IconPencil size={dataListIconSizeDefault} />,
          onClick: (id: number) => detailHandler(id),
          disabled: !userActions.view,
          hidden: !rowActions?.onDetail,
        },
        {
          id: 'clone',
          label: t('button.clone'),
          icon: <IconCopy size={dataListIconSizeDefault} />,
          onClick: (id: number) => rowActions?.onClone?.(id),
          disabled: !userActions.create,
          hidden: !rowActions?.onClone,
        },
        {
          id: 'toggle',
          label: t('button.toggle'),
          icon: row.active ? (
            <IconEye size={dataListIconSizeDefault} />
          ) : (
            <IconEyeOff size={dataListIconSizeDefault} />
          ),
          onClick: (id: number) => rowActions?.onToggle?.(id),
          disabled: !userActions.modify,
          hidden: !rowActions?.onToggle,
        },
        {
          id: 'approve',
          label: t('button.approve'),
          icon: row?.approved ? (
            <IconRosetteDiscountCheckFilled size={dataListIconSizeDefault} />
          ) : (
            <IconRosette size={dataListIconSizeDefault} />
          ),
          onClick: (id: number) => rowActions?.onApprove?.(id),
          disabled: !userActions.approve,
          hidden: !rowActions?.onApprove,
        },
        {
          id: 'read',
          label: t('button.read'),
          icon: row?.read ? (
            <IconVocabulary size={dataListIconSizeDefault} />
          ) : (
            <IconVocabularyOff size={dataListIconSizeDefault} />
          ),
          onClick: (id: number) => rowActions?.onRead?.(id),
          disabled: !userActions.modify,
          hidden: !rowActions?.onRead || !row?.read,
        },
        {
          id: 'download',
          label: 'Download',
          icon: <IconDownload size={dataListIconSizeDefault} />,
          onClick: (id: number) => rowActions?.onDownload?.(id),
          hidden: !rowActions?.onDownload,
        },
        {
          id: 'delete',
          label: row.deleted ? t('button.undelete') : t('button.delete'),
          icon: row.deleted ? (
            <IconTrashOff size={dataListIconSizeDefault} />
          ) : (
            <IconTrash size={dataListIconSizeDefault} />
          ),
          onClick: deleteConfirmHandler,
          disabled: !userActions.delete,
          hidden: !rowActions?.onDelete,
          color: 'warning',
        },
        {
          id: 'delete-permanent',
          label: t('button.deletePermanent'),
          icon: <IconTrashX size={dataListIconSizeDefault} />,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
