import { filesTypeKeys, filesUploadContextKeys } from '../enums';

export const filesTypeKeysArray = [...Object.keys(filesTypeKeys)] as [
  string,
  ...string[]
];

export const filesTypeDefault = filesTypeKeys.unsupported;

export const filesUploadContextKeysArray = [
  ...Object.keys(filesUploadContextKeys),
] as [string, ...string[]];

export const filesUploadContextDefault = filesUploadContextKeys.default;
