import { IPasswordRecoveryForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IPasswordRecoveryForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IPasswordRecoveryForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IPasswordRecoveryForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};