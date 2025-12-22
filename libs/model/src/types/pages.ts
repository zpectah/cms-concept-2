import { EnumKeyValues } from '@common';
import { pagesTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type PagesType = EnumKeyValues<typeof pagesTypeKeys>;

export interface PagesItem extends ItemBase {
  type: PagesType;

  name: string;
}

export type Pages = PagesItem[];

export interface PageDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface PagesDetail
  extends PagesItem,
    ItemLocaleBase<PageDetailLocale> {}
