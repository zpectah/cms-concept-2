import { EnumKeyValues } from '@common';
import { filesTypeKeys } from '../enums';
import { ItemBase } from './item';

export type FilesType = EnumKeyValues<typeof filesTypeKeys>;

export interface FilesItem extends ItemBase {
  type: FilesType;
}

export type Files = FilesItem[];

export type FilesDetail = FilesItem & {};
