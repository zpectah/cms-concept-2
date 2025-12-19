import { EnumKeyValues } from '@common';
import { menuItemsTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type MenuItemsType = EnumKeyValues<typeof menuItemsTypeKeys>;

export interface MenuItemsItem extends ItemBase {
  type: MenuItemsType;
}

export type MenuItems = MenuItemsItem[];

export interface MenuItemsDetailLocale {
  label: string;
}

export interface MenuItemsDetail
  extends MenuItems,
    ItemLocaleBase<MenuItemsDetailLocale> {}
