import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, FilesDetail, filesUploadContextKeys } from '@model';
import { getConfig } from '../../../config';
import { useResponseMessage, useSelectOptions } from '../../../hooks';
import { useFilesQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { IFilesUploadForm } from './types';
import { filesUploadFormSchema } from './schema';
import {
  defaultDataToForm,
  detailDataToForm,
  formDataToMaster,
} from './helpers';

export const useFilesUploadForm = () => {
  const {
    uploads: { target },
  } = getConfig();

  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'views']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IFilesUploadForm>({
    resolver: zodResolver(filesUploadFormSchema),
    defaultValues: defaultDataToForm(),
  });

  const {
    filesQuery,
    filesDetailQuery,
    filesCreateMutation,
    filesUploadMutation,
  } = useFilesQuery({ id });

  const { refetch } = filesQuery;
  const { data: detail } = filesDetailQuery;
  const { mutate: onCreate } = filesCreateMutation;
  const { mutate: onUpload } = filesUploadMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm());
  };

  const createHandler = (master: FilesDetail) => {
    onUpload(
      {
        queue: [
          /* TODO */
        ],
        options: {
          context: filesUploadContextKeys.default,
          target,
        },
      },
      {
        /* TODO */
      }
    );

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

  const submitHandler = (data: IFilesUploadForm) => {
    if (!data) return;

    // TODO: unique validation

    const master = formDataToMaster(data);

    createHandler(master);
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
    if (id) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    id,
    form,
    title: drawerTitle,
    // Actions
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    // Options
    options: {
      type: getTypeFieldOptions(modelKeys.files),
    },
  };
};
