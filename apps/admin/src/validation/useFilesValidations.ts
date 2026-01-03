import { Files, FilesItem, FilesQueue } from '@model';
import { fileUploadMaxFileSize } from '../constants';

export const useFilesValidations = () => {
  const isAttributeUnique = (
    files: Files,
    key: keyof FilesItem,
    value: string
  ): boolean => {
    const results =
      files.filter((item) => String(item[key]) === String(value)) ?? [];

    return results.length === 0;
  };

  const isValidFileSize = (size: number): boolean =>
    size <= fileUploadMaxFileSize;

  const getQueueDuplicities = (
    queue: FilesQueue,
    files: Files
  ): {
    isValid: boolean;
    duplicities?: { queue: number[]; files: number[] };
  } => {
    const duplicities: { queue: number[]; files: number[] } = {
      queue: [],
      files: [],
    };
    const seen = new Map<string, number>();

    queue.forEach((item, index) => {
      const isUnique = isAttributeUnique(
        files,
        'file_name',
        `${item.name}.${item.extension}`
      );

      if (!isUnique) duplicities.files.push(index);
    });

    queue.forEach((item, index) => {
      const fileName = `${item.name}.${item.extension}`;
      if (seen.has(fileName)) {
        duplicities.queue.push(index);
      } else {
        seen.set(fileName, index);
      }
    });

    if (duplicities.files.length > 0 || duplicities.queue.length > 0) {
      return { isValid: false, duplicities };
    }

    return { isValid: true };
  };

  return {
    isAttributeUnique,
    isValidFileSize,
    getQueueDuplicities,
  };
};
