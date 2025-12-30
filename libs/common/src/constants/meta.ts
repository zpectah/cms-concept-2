import { metaRobotsKeys } from '../enums';

export const metaRobotsKeysArray = [...Object.keys(metaRobotsKeys)] as [
  string,
  ...string[]
];

export const metaRobotsDefault = metaRobotsKeys.all;
