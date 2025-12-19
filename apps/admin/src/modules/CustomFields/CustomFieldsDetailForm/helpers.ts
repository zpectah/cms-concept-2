import { ICustomFieldsDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ICustomFieldsDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): ICustomFieldsDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ICustomFieldsDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};