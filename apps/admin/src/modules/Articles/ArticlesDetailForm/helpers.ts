import { getFormattedString } from '@common';
import {
  articlesTypeDefault,
  ArticlesDetail,
  ArticlesDetailLocale,
} from '@model';
import { getModelLocales } from '../../../helpers';
import { IArticlesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (
  locales: string[],
  author: number
): IArticlesDetailForm => {
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
    author: author,
    editor: [author],

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

/** Gets formatted detail data of clone to form */
export const cloneDetailDataToForm = (
  data: ArticlesDetail,
  author: number
): IArticlesDetailForm => {
  return Object.assign({
    ...data,
    id: 0,
    name: `clone-${data.name}`,
    approved: false,
    explicit: false,
    author: author,
    editor: [author],
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IArticlesDetailForm): ArticlesDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  return { ...master };
};
