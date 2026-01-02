import { getFormattedString } from '@common';
import {
  pagesTypeDefault,
  pagesMetaRobotsDefault,
  PagesDetail,
  PagesDetailLocale,
} from '@model';
import { getModelLocales } from '../../../helpers';
import { IPagesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (locales: string[]): IPagesDetailForm => {
  return Object.assign({
    id: 0,
    name: '',
    type: pagesTypeDefault,
    locale: getModelLocales<PagesDetailLocale>(locales, {
      title: '',
      description: '',
      content: '',
    }),
    meta_robots: pagesMetaRobotsDefault,
    category_id: 0,
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: PagesDetail): IPagesDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IPagesDetailForm): PagesDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  // We will reset category id if not selected as type
  if (master.type !== 'category') master['category_id'] = 0;

  return { ...master };
};
