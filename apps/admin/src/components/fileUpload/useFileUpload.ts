import { useRef } from 'react';
import { getClearFileName, getFileExtension, getRandomId } from '@common';
import { filesUploadContextDefault, FilesQueueItem } from '@model';
import { getFileTypeFromExtension } from './helpers';
import { UseFileUploadProps } from './types';

export const useFileUpload = ({
  isMultiple,
  onQueueChange,
  onLoadEnd,
  onLoad,
  onError,
  context = filesUploadContextDefault,
}: UseFileUploadProps) => {
  const inputElement = useRef<HTMLInputElement | null>(null);

  const changeHandler = async (files: FileList | null) => {
    if (!files) return;

    const readers = Array.from(files).map(
      (file) =>
        new Promise<FilesQueueItem>((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            onLoadEnd?.();
          };
          reader.onload = () => {
            const base64 = reader.result as string;
            const extension = getFileExtension(file.name);

            resolve({
              content: base64,
              mime: file.type,
              size: file.size,
              name: getClearFileName(file.name),
              extension,
              type: getFileTypeFromExtension(extension),
              uid: getRandomId(),
              context,
              explicit: false,
            });

            onLoad?.();
          };

          reader.onerror = () => {
            reject(reader.error);
            onError?.(reader.error);
          };

          reader.readAsDataURL(file);
        })
    );

    await Promise.all(readers).then((results) => {
      const newQueue = isMultiple ? [...results] : results;

      onQueueChange?.(newQueue);

      /* Resets value after files drop */
      inputElement.current && (inputElement.current.value = '');
    });
  };

  return {
    inputRef: inputElement,
    onChange: changeHandler,
  };
};
