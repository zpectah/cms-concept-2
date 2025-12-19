import { EnumKeyValues } from '@common';
import { translationsTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type TranslationsType = EnumKeyValues<typeof translationsTypeKeys>;

export interface TranslationsItem extends ItemBase {
  type: TranslationsType;
}

export type Translations = TranslationsItem[];

export interface TranslationsDetailLocale {
  value: string;
}

export interface TranslationsDetail
  extends TranslationsItem,
    ItemLocaleBase<TranslationsDetailLocale> {}
