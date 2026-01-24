import { EnumKeyValues } from '@common';
import { menuItemsTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type MenuItemsType = EnumKeyValues<typeof menuItemsTypeKeys>;

export interface MenuItemsItem extends ItemBase {
  uid: string;
  name: string;
  type: MenuItemsType;
  parent_id: number;
  menu_id: number;
  link_page?: number;
  link_url?: string;
  item_order: number;
}

export type MenuItems = MenuItemsItem[];

export interface MenuItemsDetailLocale {
  label: string;
}

export interface MenuItemsDetail
  extends MenuItemsItem,
    ItemLocaleBase<MenuItemsDetailLocale> {}

/** Just for recursive iteration */
export interface MenuItemsNode extends MenuItemsItem {
  children: MenuItemsNode[];
}
