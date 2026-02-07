import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useCommentsQuery } from '../../../../../query';
import { useProfile } from '../../../../../hooks';
import { useCommentsManagerContext } from '../CommentsManager.context';
import { commentsManagerDetailFormSchema } from './schema';
import { ICommentsManagerDetailForm } from './types';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useCommentsManagerDetailForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { user } = useProfile();
  const {
    detailOpen,
    setDetailOpen,
    contentType,
    contentId,
    parentId,
    rowActions: { onCreate, onPatch, onDelete },
  } = useCommentsManagerContext();
  const { commentsDetailQuery, commentsParentDetailQuery } = useCommentsQuery({
    id: detailOpen,
    parentId,
  });
  const form = useForm<ICommentsManagerDetailForm>({
    defaultValues: defaultDataToForm({
      sender: user.email,
      contentType,
      contentId,
    }),
    resolver: zodResolver(commentsManagerDetailFormSchema),
  });

  const formId = 'comments-manager-detail-form';

  const { data: detailData, isLoading } = commentsDetailQuery;
  const { data: parentDetailData, isLoading: isParentLoading } =
    commentsParentDetailQuery;

  const submitHandler: SubmitHandler<ICommentsManagerDetailForm> = (data) => {
    const master = formDataToMaster(data, parentDetailData);

    if (master.id === 0) {
      onCreate(master);
    } else {
      onPatch(master);
    }
  };

  const resetHandler = useCallback(() => {
    if (!detailOpen) return;

    if (detailOpen === 'new') {
      form.reset(
        defaultDataToForm({
          sender: user.email,
          contentType,
          contentId,
        })
      );

      if (parentDetailData) {
        form.setValue('subject', `Re: ${parentDetailData.subject}`, {
          shouldDirty: false,
        });
      }
    } else if (detailData) {
      form.reset(detailDataToForm(detailData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen, detailData, parentDetailData, isLoading, isParentLoading]);

  const detailTitle = useMemo(() => {
    let title =
      detailOpen === 'new' ? t('button.new.comments') : detailData?.subject;
    if (parentDetailData) title = `Re: ` + parentDetailData?.subject;

    return title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen, detailData, parentId, parentDetailData]);

  useEffect(() => {
    if (detailOpen) {
      setOpen(true);
      resetHandler();
    } else {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['comments', 'detail'],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen, isLoading, isParentLoading]);

  useEffect(() => {
    if (!open) setTimeout(() => setDetailOpen(null), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    open,
    setOpen,
    detailId: detailOpen,
    detailTitle,
    formId,
    form,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    onDelete,
    // Options
    // Values
  };
};
