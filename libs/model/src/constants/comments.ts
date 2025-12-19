import { commentsTypeKeys } from '../enums';

export const commentsTypeKeysArray = [...Object.keys(commentsTypeKeys)] as [
  string,
  ...string[]
];

export const commentsTypeDefault = commentsTypeKeys.default;
