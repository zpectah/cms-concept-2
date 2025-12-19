import { blacklistTypeKeys } from '../enums';

export const blacklistTypeKeysArray = [...Object.keys(blacklistTypeKeys)] as [
  string,
  ...string[]
];

export const blacklistTypeDefault = blacklistTypeKeys.default;
