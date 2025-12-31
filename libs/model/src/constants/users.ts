import { usersAccessKeys, usersTypeKeys, userAccessNamesKeys } from '../enums';

export const usersTypeKeysArray = [...Object.keys(usersTypeKeys)] as [
  string,
  ...string[]
];

export const usersTypeDefault = usersTypeKeys.default;

export const userAccessNamesKeysArray = [
  ...Object.keys(userAccessNamesKeys),
] as [string, ...string[]];

export const usersAccessKeysArray = [...Object.keys(usersAccessKeys)] as [
  string,
  ...string[]
];

export const usersAccessDefault = usersAccessKeys.none;
