import { EnumKeyValues } from '@common';
import { categoriesTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type CategoriesType = EnumKeyValues<typeof categoriesTypeKeys>;

export interface CategoriesItem extends ItemBase {
  name: string;
  type: CategoriesType;
}

export type Categories = CategoriesItem[];

export interface CategoriesDetailLocale {
  title: string;
  description?: string;
}

export interface CategoriesDetail
  extends CategoriesItem,
    ItemLocaleBase<CategoriesDetailLocale> {}
