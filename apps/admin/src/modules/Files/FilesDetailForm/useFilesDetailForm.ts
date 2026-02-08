import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, FilesDetail, FilesType } from '@model';
import { useResponseMessage, useSelectOptions } from '../../../hooks';
import { useFilesQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { IFilesDetailForm } from './types';
import { filesDetailFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useFilesDetailForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IFilesDetailForm>({
    resolver: zodResolver(filesDetailFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const {
    filesQuery,
    filesDetailQuery,
    filesPatchMutation,
    filesDeleteMutation,
  } = useFilesQuery({ id });

  const formId = 'files-detail-form';

  const { refetch } = filesQuery;
  const { data: detail } = filesDetailQuery;
  const { mutate: onPatch } = filesPatchMutation;
  const { mutate: onDelete } = filesDeleteMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm());
  };

  const patchHandler = (master: FilesDetail) => {
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

  const submitHandler = (data: IFilesDetailForm) => {
    if (!data) return;

    // TODO: unique validation

    const master = formDataToMaster(data);

    if (data.id !== 0) patchHandler(master);
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
      type: getTypeFieldOptions(modelKeys.files),
    },
    // Local values
    values: {
      type: form.watch('type') as FilesType,
      name: form.watch('name'),
      file_name: form.watch('file_name'),
      file_ext: form.watch('file_ext'),
    },
  };
};
