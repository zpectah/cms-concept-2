import { getFormattedString } from '@common';
import {
  translationsTypeDefault,
  TranslationsDetailLocale,
  TranslationsDetail,
} from '@model';
import { getModelLocales } from '../../../helpers';
import { ITranslationsDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (
  locales: string[]
): ITranslationsDetailForm => {
  return Object.assign({
    id: 0,
    name: '',
    type: translationsTypeDefault,
    locale: getModelLocales<TranslationsDetailLocale>(locales, {
      value: '',
    }),
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (
  data: TranslationsDetail
): ITranslationsDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: ITranslationsDetailForm
): TranslationsDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  return { ...master };
};
