import { pagesTypeKeys } from '../enums';

export const pagesTypeKeysArray = [...Object.keys(pagesTypeKeys)] as [
  string,
  ...string[]
];

export const pagesTypeDefault = pagesTypeKeys.default;
