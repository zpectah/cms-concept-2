import { ItemBase, ItemLocaleBase } from './item';

export interface ArticlesItem extends ItemBase {
  name: string;
  type: string; // TODO

  tags: number[];
  categories: number[];
}

export type Articles = ArticlesItem[];

export interface ArticlesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface ArticlesDetail
  extends ArticlesItem,
    ItemLocaleBase<ArticlesDetailLocale> {}
