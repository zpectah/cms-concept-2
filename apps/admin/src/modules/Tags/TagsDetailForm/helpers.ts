import { ITagsDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ITagsDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): ITagsDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ITagsDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};