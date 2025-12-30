import { usersAccessKeys, usersTypeKeys } from '../enums';

export const usersTypeKeysArray = [...Object.keys(usersTypeKeys)] as [
  string,
  ...string[]
];

export const usersTypeDefault = usersTypeKeys.default;

export const usersAccessKeysArray = [...Object.keys(usersAccessKeys)] as [
  string,
  ...string[]
];
