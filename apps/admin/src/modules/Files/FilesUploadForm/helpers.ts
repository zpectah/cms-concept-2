import { FilesDetail } from '@model';
import { IFilesUploadForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IFilesUploadForm => {
  return Object.assign({});
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: FilesDetail): IFilesUploadForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IFilesUploadForm): FilesDetail => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};
