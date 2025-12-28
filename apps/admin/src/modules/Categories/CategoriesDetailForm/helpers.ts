import { getFormattedString } from '@common';
import {
  categoriesTypeDefault,
  CategoriesDetail,
  CategoriesDetailLocale,
} from '@model';
import { getModelLocales } from '../../../helpers';
import { ICategoriesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (locales: string[]): ICategoriesDetailForm => {
  return Object.assign({
    id: 0,
    active: true,
    deleted: false,
    name: '',
    type: categoriesTypeDefault,
    parent_id: 0,
    locale: getModelLocales<CategoriesDetailLocale>(locales, {
      title: '',
      description: '',
    }),
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (
  data: CategoriesDetail
): ICategoriesDetailForm => {
  return Object.assign({ ...data });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: ICategoriesDetailForm
): CategoriesDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  return { ...master };
};
