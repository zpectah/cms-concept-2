import { useState, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { filesTypeKeys, FilesQueue } from '@model';
import { useAppStore } from '../../../../store';
import { useFileUpload } from '../../../../components';
import { useFilesValidations } from '../../../../validation';
import { IFilesUploadForm } from '../types';

export const useFilesUploadQueue = () => {
  const [isOver, setIsOver] = useState(false);

  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { control, watch } = useFormContext<IFilesUploadForm>();
  const { prepend, remove } = useFieldArray({ control, name: 'queue' });
  const { isValidFileSize } = useFilesValidations();

  const changeCallback = (queue: FilesQueue) => {
    queue?.forEach((item) => {
      if (!isValidFileSize(item.size)) {
        addToast({
          title: t('message.warning.file_max_size', {
            file: `${item.name}.${item.extension}`,
          }),
          severity: 'warning',
        });

        return;
      }

      if (item.type === filesTypeKeys.unsupported) {
        addToast({
          title: t('message.warning.file_unsupported', {
            file: `${item.name}.${item.extension}`,
          }),
          severity: 'warning',
        });

        return;
      }

      if (item.type === filesTypeKeys.unknown) {
        addToast({
          title: t('message.warning.file_unknown', {
            file: `${item.name}.${item.extension}`,
          }),
          severity: 'warning',
        });

        return;
      }

      prepend(item);
    });
  };

  const dragEnterHandler = (event: DragEvent) => {
    event.preventDefault();
    setIsOver(true);
  };

  const dragLeaveHandler = (event: DragEvent) => {
    event.preventDefault();
    setIsOver(false);
  };

  const dragOverHandler = (event: DragEvent) => {
    // Nutné pro povolení dropu
    event.preventDefault();
  };

  const dropHandler = (event: DragEvent) => {
    event.preventDefault();
    onChange(event?.dataTransfer?.files as FileList);
  };

  const { inputRef, onChange } = useFileUpload({
    onQueueChange: changeCallback,
    isMultiple: true,
  });

  const queue = watch('queue') as FilesQueue;

  return {
    queue,
    inputRef,
    onChange,
    onRemove: remove,
    isOver,
    onDrop: dropHandler,
    onDragEnter: dragEnterHandler,
    onDragLeave: dragLeaveHandler,
    onDragOver: dragOverHandler,
  };
};
