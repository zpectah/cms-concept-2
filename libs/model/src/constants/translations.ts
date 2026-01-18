import { translationsNamespaceKeys, translationsTypeKeys } from '../enums';

export const translationsTypeKeysArray = [
  ...Object.keys(translationsTypeKeys),
] as [string, ...string[]];

export const translationsNamespaceKeysArray = [
  ...Object.keys(translationsNamespaceKeys),
] as [string, ...string[]];

export const translationsTypeDefault = translationsTypeKeys.default;
export const translationsNamespaceDefault = translationsNamespaceKeys.common;
