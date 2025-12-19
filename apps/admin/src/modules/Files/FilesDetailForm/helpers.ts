import { IFilesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IFilesDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IFilesDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IFilesDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};