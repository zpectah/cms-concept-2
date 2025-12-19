import { categoriesTypeKeys } from '../enums';

export const categoriesTypeKeysArray = [...Object.keys(categoriesTypeKeys)] as [
  string,
  ...string[]
];

export const categoriesTypeDefault = categoriesTypeKeys.default;
