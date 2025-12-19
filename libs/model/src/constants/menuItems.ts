import { menuItemsTypeKeys } from '../enums';

export const menuItemsTypeKeysArray = [...Object.keys(menuItemsTypeKeys)] as [
  string,
  ...string[]
];

export const menuItemsTypeDefault = menuItemsTypeKeys.page;
