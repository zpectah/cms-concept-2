import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, FilesUploadRequest, FilesQueue } from '@model';
import { getConfig } from '../../../config';
import { useResponseMessage, useSelectOptions } from '../../../hooks';
import { useFilesQuery } from '../../../query';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { useFilesValidations } from '../../../validation';
import { IFilesUploadForm } from './types';
import { filesUploadFormSchema } from './schema';
import { defaultDataToForm, formDataToMaster, queueToFiles } from './helpers';

export const useFilesUploadForm = () => {
  const {
    uploads: { target },
  } = getConfig();

  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'form']);
  const { addToast } = useAppStore();
  const { rootUrl } = useViewContext();
  const { id } = useParams();
  const { onError } = useResponseMessage();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IFilesUploadForm>({
    resolver: zodResolver(filesUploadFormSchema),
    defaultValues: defaultDataToForm(target),
  });
  const { getQueueDuplicities } = useFilesValidations();
  const { filesQuery, filesCreateMutation, filesUploadMutation } =
    useFilesQuery({ id });

  const formId = 'files-upload-form';

  const { data: files, refetch } = filesQuery;
  const { mutate: onCreate } = filesCreateMutation;
  const { mutate: onUpload } = filesUploadMutation;

  const closeHandler = () => {
    navigate(rootUrl);
    form.reset(defaultDataToForm(target));
  };

  const createHandler = (master: FilesUploadRequest) => {
    onUpload(master, {
      onSuccess: (res) => {
        const updatedQueue = queueToFiles([...master.queue]);

        onCreate(updatedQueue, {
          onSuccess: ({ ids }) => {
            closeHandler();
            addToast({
              title: t('message.success.create', { count: ids.length }),
              severity: 'success',
              autoclose: true,
            });
            refetch();
          },
          onError,
        });
      },
    });
  };

  const submitHandler = (data: IFilesUploadForm) => {
    if (!data || !data?.queue) return;

    const validation = getQueueDuplicities(
      data.queue as FilesQueue,
      files ? [...files] : []
    );

    if (validation.duplicities) {
      if (validation.duplicities?.files) {
        validation.duplicities.files?.forEach((index) => {
          console.log('err', index);
          form.setError(`queue.${index}.name`, {
            message: t('form:message.error.file_db_duplicity'),
          });
        });
      }
      if (validation.duplicities.queue) {
        validation.duplicities.queue?.forEach((index) => {
          console.log('err', index);
          form.setError(`queue.${index}.name`, {
            message: t('form:message.error.file_queue_duplicity'),
          });
        });
      }

      return;
    }

    const master = formDataToMaster(data);

    createHandler(master);
  };

  const resetHandler = useCallback(() => {
    if (id === 'new') {
      form.reset(defaultDataToForm(target));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, form]);

  useEffect(() => {
    if (id) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    id,
    form,
    formId,
    title: t('views:files.new'),
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
