import dayjs from 'dayjs';
import { getFormattedString } from '@common';
import {
  articlesTypeDefault,
  ArticlesDetail,
  ArticlesDetailLocale,
} from '@model';
import { getModelLocales } from '../../../helpers';
import { addressFormDefaults } from '../../../constants';
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
    // Event specific
    event_location: [0, 0],
    event_address: addressFormDefaults,
    event_start: null,
    event_end: null,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: ArticlesDetail): IArticlesDetailForm => {
  return Object.assign({
    ...data,

    event_start: data.event_start ? dayjs(data.event_start) : null,
    event_end: data.event_end ? dayjs(data.event_end) : null,
    event_address: {
      ...data.event_address,
      zip: String(data.event_address?.zip ?? ''),
    },
  });
};

/** Gets formatted detail data of clone to form */
export const cloneDetailDataToForm = (
  data: ArticlesDetail,
  author: number
): IArticlesDetailForm => {
  const clone = detailDataToForm(data);

  return Object.assign({
    ...clone,
    id: 0,
    name: `clone-${data.name}`,
    approved: false,
    explicit: false,
    author: author,
    editor: [author],
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: IArticlesDetailForm,
  editor: number
): ArticlesDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  // Update array with editor
  if (master.id !== 0 && editor) {
    if (!master.editor.includes(editor)) master.editor.push(editor);
  }

  return { ...master };
};
