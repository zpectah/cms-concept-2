import { filesTypeKeys } from '../enums';

export const filesTypeKeysArray = [...Object.keys(filesTypeKeys)] as [
  string,
  ...string[]
];

export const filesTypeDefault = filesTypeKeys.default;
