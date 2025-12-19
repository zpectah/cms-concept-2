import { membersTypeKeys } from '../enums';

export const membersTypeKeysArray = [...Object.keys(membersTypeKeys)] as [
  string,
  ...string[]
];

export const membersTypeDefault = membersTypeKeys.default;
