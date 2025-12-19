import { articlesTypeKeys } from '../enums';

export const articlesTypeKeysArray = [...Object.keys(articlesTypeKeys)] as [
  string,
  ...string[]
];

export const articlesTypeDefault = articlesTypeKeys.default;
