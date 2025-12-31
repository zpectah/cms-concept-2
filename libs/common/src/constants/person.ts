import { personSexKeys } from '../enums';

export const personSexKeysArray = [...Object.keys(personSexKeys)] as [
  string,
  ...string[]
];

export const personSexDefault = personSexKeys.unset;
