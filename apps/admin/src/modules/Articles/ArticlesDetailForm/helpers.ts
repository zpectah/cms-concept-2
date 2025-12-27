import {
  articlesTypeDefault,
  ArticlesDetail,
  ArticlesDetailLocale,
} from '@model';
import { getModelLocales } from '../../../helpers';
import { IArticlesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (locales: string[]): IArticlesDetailForm => {
  return Object.assign({
    id: 0,
    active: true,
    deleted: false,

    name: '',
    type: articlesTypeDefault,
    categories: [],
    tags: [],
    files: [],
    approved: false,
    explicit: false,
    author: 0,
    editor: [],

    locale: getModelLocales<ArticlesDetailLocale>(locales, {
      title: '',
      description: '',
      content: '',
    }),
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: ArticlesDetail): IArticlesDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IArticlesDetailForm): ArticlesDetail => {
  const master = Object.assign({
    ...data,
  });

  // TODO: modify master

  return { ...master };
};
