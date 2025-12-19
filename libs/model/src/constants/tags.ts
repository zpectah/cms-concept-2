import { tagsTypeKeys } from '../enums';

export const tagsTypeKeysArray = [...Object.keys(tagsTypeKeys)] as [
  string,
  ...string[]
];

export const tagsTypeDefault = tagsTypeKeys.default;
