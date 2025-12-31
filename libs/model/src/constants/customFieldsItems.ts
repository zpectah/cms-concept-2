import { customFieldsItemsTypeKeys } from '../enums';

export const customFieldsItemsTypeKeysArray = [
  ...Object.keys(customFieldsItemsTypeKeys),
] as [string, ...string[]];

export const customFieldsItemsTypeDefault = customFieldsItemsTypeKeys.default;
