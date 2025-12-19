import { IUsersDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IUsersDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IUsersDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IUsersDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};