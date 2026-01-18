import { EnumKeyValues } from '@common';
import { translationsTypeKeys, translationsNamespaceKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type TranslationsType = EnumKeyValues<typeof translationsTypeKeys>;
export type TranslationsNamespace = EnumKeyValues<
  typeof translationsNamespaceKeys
>;

export interface TranslationsItem extends ItemBase {
  type: TranslationsType;
  name: string;
  namespace: TranslationsNamespace;
}

export type Translations = TranslationsItem[];

export interface TranslationsDetailLocale {
  value: string;
}

export interface TranslationsDetail
  extends TranslationsItem,
    ItemLocaleBase<TranslationsDetailLocale> {}
