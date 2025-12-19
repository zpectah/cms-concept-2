import { IPagesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IPagesDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IPagesDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IPagesDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};