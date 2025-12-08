import { ItemBase, ItemLocaleBase } from './item';

export interface CategoriesItem extends ItemBase {
  name: string;
  type: string; // TODO
}

export type Categories = CategoriesItem[];

export interface CategoriesDetailLocale {
  title: string;
  description?: string;
}

export interface CategoriesDetail
  extends CategoriesItem,
    ItemLocaleBase<CategoriesDetailLocale> {}
