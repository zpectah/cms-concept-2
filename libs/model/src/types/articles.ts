import { Address, EnumKeyValues, GpsLocation } from '@common';
import { articlesTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type ArticlesType = EnumKeyValues<typeof articlesTypeKeys>;

export interface ArticlesItem extends ItemBase {
  name: string;
  type: ArticlesType;
  tags: number[];
  categories: number[];
  files: number[];
  approved: boolean;
  explicit: boolean;
  author: number;
  editor: number[];
  // Event specific
  event_address?: Address;
  event_location?: GpsLocation;
  event_start?: string;
  event_end?: string;
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
