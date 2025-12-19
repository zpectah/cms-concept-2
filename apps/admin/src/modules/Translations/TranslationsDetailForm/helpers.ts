import { ITranslationsDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ITranslationsDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): ITranslationsDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ITranslationsDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};