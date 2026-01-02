import { pagesTypeKeys, pagesMetaRobotsKeys } from '../enums';

export const pagesTypeKeysArray = [...Object.keys(pagesTypeKeys)] as [
  string,
  ...string[]
];

export const pagesTypeDefault = pagesTypeKeys.default;

export const pagesMetaRobotsKeysArray = [
  ...Object.keys(pagesMetaRobotsKeys),
] as [string, ...string[]];

export const pagesMetaRobotsDefault = pagesMetaRobotsKeys.inherit;
