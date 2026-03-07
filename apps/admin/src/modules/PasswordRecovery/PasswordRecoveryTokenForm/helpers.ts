import { IPasswordRecoveryTokenForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (
  token?: string,
  email?: string
): IPasswordRecoveryTokenForm => {
  return Object.assign({
    token,
    email,
    password: '',
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: IPasswordRecoveryTokenForm
): { token: string; email: string; password: string } => {
  const master = Object.assign({
    token: data.token,
    email: data.email,
    password: data.password,
  });

  return { ...master };
};
