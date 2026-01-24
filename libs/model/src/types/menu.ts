import { EnumKeyValues } from '@common';
import { menuTypeKeys } from '../enums';
import { ItemBase } from './item';

export type MenuType = EnumKeyValues<typeof menuTypeKeys>;

export interface MenuItem extends ItemBase {
  uid: string;
  type: MenuType;
  name: string;
}

export type Menu = MenuItem[];

export type MenuDetail = MenuItem & {};
