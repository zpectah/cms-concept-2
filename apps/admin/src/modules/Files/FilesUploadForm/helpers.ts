import { IFilesUploadForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IFilesUploadForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IFilesUploadForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IFilesUploadForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};