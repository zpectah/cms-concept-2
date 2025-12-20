import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { contentModelKeysArray, ContentModelNames } from '@model';
import { FavoriteStar } from '../../button';
import { useDataListContext } from '../DataList.context';

export const useDataListView = () => {
  const navigate = useNavigate();
  const { model, root, rowActions } = useDataListContext();

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
      console.log('confirm', id);

      rowActions?.onDelete?.(id);
    },
    [rowActions]
  );

  const deletePermanentConfirmHandler = useCallback(
    (id: number) => {
      console.log('confirm', id);

      rowActions?.onDeletePermanent?.(id);
    },
    [rowActions]
  );

  const renderRowActions = useCallback(
    (id: string | number | undefined) => {
      if (!id) return null;

      const actions = [
        {
          id: 'detail',
          label: 'Detail',
          icon: <>ico</>,
          onClick: (id: number) => detailHandler(id),
          disabled: false,
          hidden: !rowActions?.onDetail,
        },
        {
          id: 'toggle',
          label: 'Toggle',
          icon: <>ico</>,
          onClick: (id: number) => rowActions?.onToggle?.(id),
          disabled: false,
          hidden: !rowActions?.onToggle,
        },

        {
          id: 'clone',
          label: 'Clone',
          icon: <>ico</>,
          onClick: (id: number) => rowActions?.onClone?.(id),
          disabled: false,
          hidden: !rowActions?.onClone,
        },
        {
          id: 'approve',
          label: 'Approve',
          icon: <>ico</>,
          onClick: (id: number) => rowActions?.onApprove?.(id),
          disabled: false,
          hidden: !rowActions?.onApprove,
        },
        {
          id: 'read',
          label: 'Read',
          icon: <>ico</>,
          onClick: (id: number) => rowActions?.onRead?.(id),
          disabled: false,
          hidden: !rowActions?.onRead,
        },

        {
          id: 'delete',
          label: 'Delete',
          icon: <>ico</>,
          onClick: deleteConfirmHandler,
          disabled: false,
          hidden: !rowActions?.onDelete,
        },
        {
          id: 'delete-permanent',
          label: 'Delete permanent',
          icon: <>ico</>,
          onClick: deletePermanentConfirmHandler,
          disabled: false,
          hidden: !rowActions?.onDeletePermanent,
        },
      ];

      return (
        <Stack direction="row" gap={1}>
          {actions.map(
            ({ label, icon, onClick, disabled, hidden, ...item }) => {
              if (hidden) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => onClick(Number(id))}
                  disabled={disabled}
                >
                  {label}
                </button>
              );
            }
          )}
        </Stack>
      );
    },
    [rowActions, deleteConfirmHandler, deletePermanentConfirmHandler]
  );

  return {
    renderFavoriteStar,
    renderRowActions,
  };
};
