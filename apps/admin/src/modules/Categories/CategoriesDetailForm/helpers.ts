import { ICategoriesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ICategoriesDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): ICategoriesDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ICategoriesDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};