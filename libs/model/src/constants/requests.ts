import { requestsTypeKeys } from '../enums';

export const requestsTypeKeysArray = [...Object.keys(requestsTypeKeys)] as [
  string,
  ...string[]
];

export const requestsTypeDefault = requestsTypeKeys.default;
