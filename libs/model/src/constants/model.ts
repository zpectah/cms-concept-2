import { contentModelKeys, systemModelKeys, modelKeys } from '../enums';

export const contentModelKeysArray = [...Object.keys(contentModelKeys)] as [
  string,
  ...string[]
];

export const systemModelKeysArray = [...Object.keys(systemModelKeys)] as [
  string,
  ...string[]
];

export const modelKeysArray = [...Object.keys(modelKeys)] as [
  string,
  ...string[]
];
