import { metaRobotsKeys } from '@common';

export const pagesTypeKeys = {
  default: 'default',
  category: 'category',
  // TODO ...
} as const;

export const pagesMetaRobotsKeys = {
  ...metaRobotsKeys,
  inherit: 'inherit',
} as const;
