import { menuTypeKeys } from '../enums';

export const menuTypeKeysArray = [...Object.keys(menuTypeKeys)] as [
  string,
  ...string[]
];

export const menuTypeDefault = menuTypeKeys.default;
