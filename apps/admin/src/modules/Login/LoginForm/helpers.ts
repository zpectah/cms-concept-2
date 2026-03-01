import { ILoginForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ILoginForm => {
  return Object.assign({
    email: '',
    password: '',
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: ILoginForm
): { email: string; password: string } => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};
