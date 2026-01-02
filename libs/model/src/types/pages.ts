import { EnumKeyValues } from '@common';
import { pagesMetaRobotsKeys, pagesTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type PagesType = EnumKeyValues<typeof pagesTypeKeys>;
export type PagesMetaRobots = EnumKeyValues<typeof pagesMetaRobotsKeys>;

export interface PagesItem extends ItemBase {
  type: PagesType;
  name: string;
  meta_robots?: PagesMetaRobots;
  category_id: number;
}

export type Pages = PagesItem[];

export interface PagesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface PagesDetail
  extends PagesItem,
    ItemLocaleBase<PagesDetailLocale> {}
