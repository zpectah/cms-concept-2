import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, tagsColorKeysArray, TagsDetail } from '@model';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { useTagsQuery } from '../../../query';
import { useResponseMessage, useSelectOptions } from '../../../hooks';
import { ITagsDetailForm } from './types';
import { tagsDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useTagsDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions, getTranslatedOptionsFromList } =
    useSelectOptions();
  const form = useForm<ITagsDetailForm>({
    resolver: zodResolver(tagsDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const {
    tagsQuery,
    tagsDetailQuery,
    tagsCreateMutation,
    tagsPatchMutation,
    tagsDeleteMutation,
  } = useTagsQuery({ id });

  const formId = 'tags-detail-form';

  const { refetch } = tagsQuery;
  const { data: detail } = tagsDetailQuery;
  const { mutate: onCreate } = tagsCreateMutation;
  const { mutate: onPatch } = tagsPatchMutation;
  const { mutate: onDelete } = tagsDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm());
  };

  const createHandler = (master: TagsDetail) => {
    onCreate(master, {
      onSuccess: ({ id }) => {
        closeHandler();
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

  const patchHandler = (master: TagsDetail) => {
    onPatch(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
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

  const submitHandler = (data: ITagsDetailForm) => {
    if (!data) return;

    // TODO: unique validation

    const master = formDataToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const deleteHandler = (id: number) => {
    if (!id) return;

    const master = [Number(id)];

    onDelete(master, {
      onSuccess: ({ rows }) => {
        closeHandler();
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

  const drawerTitle = useMemo(() => {
    return id === 'new' ? t('views:tags.new') : detail?.name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  const resetHandler = useCallback(() => {
    if (id === 'new') {
      form.reset(defaultDataToForm());
    } else if (detail) {
      form.reset(detailDataToForm(detail));
    }
  }, [id, detail, form]);

  useEffect(() => {
    if (id || detail) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detail]);

  return {
    id,
    form,
    formId,
    title: drawerTitle,
    // Actions
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onDelete: deleteHandler,
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.tags),
      color: getTranslatedOptionsFromList(tagsColorKeysArray, 'color'),
    },
    // Values
    values: {},
  };
};
