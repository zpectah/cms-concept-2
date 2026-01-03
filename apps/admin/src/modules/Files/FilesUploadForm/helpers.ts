import { getFormattedString } from '@common';
import {
  filesUploadContextDefault,
  FilesUploadRequest,
  FilesQueue,
  Files,
} from '@model';
import { IFilesUploadForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (target: string): IFilesUploadForm => {
  return Object.assign({
    queue: [],
    options: {
      target: target,
      context: filesUploadContextDefault,
    },
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: IFilesUploadForm
): FilesUploadRequest => {
  const queue = [...data.queue].map((item) => ({
    ...item,
    name: getFormattedString(item.name),
  }));
  const options = {
    ...data.options,
  };

  const master = Object.assign({
    queue,
    options,
  });

  return { ...master };
};

/** Gets formatted files object from files queue */
export const queueToFiles = (queue: FilesQueue): Files => {
  return [...queue].map((item) => ({
    id: 0,
    name: item.uid,
    type: item.type,
    active: true,
    deleted: false,
    file_name: `${item.name}.${item.extension}`,
    file_type: item.mime,
    file_ext: item.extension,
    file_size: item.size,
    explicit: item.explicit,
  }));
};
