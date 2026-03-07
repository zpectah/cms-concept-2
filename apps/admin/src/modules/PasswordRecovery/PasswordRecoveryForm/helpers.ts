import { IPasswordRecoveryForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IPasswordRecoveryForm => {
  return Object.assign({
    email: '',
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: IPasswordRecoveryForm,
  type: string,
  path: string
): { email: string; type: string; path: string } => {
  const master = Object.assign({
    email: data.email,
    type,
    path,
  });

  return { ...master };
};
