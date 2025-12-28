import { tagsColorKeys, tagsTypeKeys } from '../enums';

export const tagsTypeKeysArray = [...Object.keys(tagsTypeKeys)] as [
  string,
  ...string[]
];

export const tagsTypeDefault = tagsTypeKeys.default;

export const tagsColorKeysArray = [...Object.keys(tagsColorKeys)] as [
  string,
  ...string[]
];

export const tagsColorDefault = tagsColorKeys.none;
