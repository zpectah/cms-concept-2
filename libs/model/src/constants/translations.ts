import { translationsTypeKeys } from '../enums';

export const translationsTypeKeysArray = [
  ...Object.keys(translationsTypeKeys),
] as [string, ...string[]];

export const translationsTypeDefault = translationsTypeKeys.default;
