import { customFieldsTypeKeys } from '../enums';

export const customFieldsTypeKeysArray = [
  ...Object.keys(customFieldsTypeKeys),
] as [string, ...string[]];

export const customFieldsTypeDefault = customFieldsTypeKeys.text;
