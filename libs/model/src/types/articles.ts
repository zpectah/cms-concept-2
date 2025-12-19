import { EnumKeyValues } from '@common';
import { articlesTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type ArticlesType = EnumKeyValues<typeof articlesTypeKeys>;

export interface ArticlesItem extends ItemBase {
  name: string;
  type: ArticlesType;

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
