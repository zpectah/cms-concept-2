import { IMembersDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IMembersDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IMembersDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IMembersDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};