import { IMenuDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IMenuDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IMenuDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IMenuDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};