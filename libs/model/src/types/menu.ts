import { EnumKeyValues } from '@common';
import { menuTypeKeys } from '../enums';
import { ItemBase } from './item';

export type MenuType = EnumKeyValues<typeof menuTypeKeys>;

export interface MenuItem extends ItemBase {
  type: MenuType;
}

export type Menu = MenuItem[];

export type MenuDetail = MenuItem & {};
