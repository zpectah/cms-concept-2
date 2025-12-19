import { ILoginForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ILoginForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): ILoginForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ILoginForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};