import { ArticlesDetail } from '@model';
import { IArticlesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IArticlesDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: ArticlesDetail): IArticlesDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IArticlesDetailForm): ArticlesDetail => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};
