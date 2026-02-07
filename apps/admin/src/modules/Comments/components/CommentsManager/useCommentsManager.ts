import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { CommentsDetail } from '@model';
import { useAppStore } from '../../../../store';
import { useResponseMessage } from '../../../../hooks';
import { useCommentsQuery } from '../../../../query';
import { UseCommentsManagerProps } from './types';

export const useCommentsManager = ({
  contentType,
  contentId,
}: UseCommentsManagerProps) => {
  const [detail, setDetail] = useState<number | 'new' | null>(null);
  const [replyId, setReplyId] = useState<number | null>(null);

  const { t } = useTranslation(['common']);
  const { addToast, setConfirmDialog } = useAppStore();
  const { onError } = useResponseMessage();
  const queryClient = useQueryClient();
  const {
    commentsCreateMutation,
    commentsPatchMutation,
    commentsToggleMutation,
    commentsDeleteMutation,
    commentsDeletePermanentMutation,
  } = useCommentsQuery({ contentType, contentId });

  const { mutate: onCreate } = commentsCreateMutation;
  const { mutate: onPatch } = commentsPatchMutation;
  const { mutate: onToggle } = commentsToggleMutation;
  const { mutate: onDelete } = commentsDeleteMutation;
  const { mutate: onDeletePermanent } = commentsDeletePermanentMutation;

  const detailHandler = (detail: number | 'new', parentId?: number | null) => {
    setDetail(detail);
    setReplyId(parentId ? parentId : null);
  };

  const reloadHandler = () =>
    queryClient.invalidateQueries({
      queryKey: ['comments', contentType, contentId],
    });

  const createHandler = (master: CommentsDetail) => {
    onCreate(master, {
      onSuccess: ({ id }) => {
        addToast({
          title: t('message.success.create', { count: id ? 1 : 0 }),
          severity: 'success',
          autoclose: true,
        });
        setDetail(null);
        setReplyId(null);
        reloadHandler();
      },
      onError,
    });
  };

  const patchHandler = (master: CommentsDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: 'success',
          autoclose: true,
        });
        setDetail(null);
        setReplyId(null);
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
    parentId: replyId,
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
