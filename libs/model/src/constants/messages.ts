import { messagesTypeKeys } from '../enums';

export const messagesTypeKeysArray = [...Object.keys(messagesTypeKeys)] as [
  string,
  ...string[]
];

export const messagesTypeDefault = messagesTypeKeys.default;
