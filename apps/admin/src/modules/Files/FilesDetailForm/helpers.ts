import { FilesDetail } from '@model';
import { IFilesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IFilesDetailForm => {
  return Object.assign({});
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: FilesDetail): IFilesDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IFilesDetailForm): FilesDetail => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};
