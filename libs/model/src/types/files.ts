import { EnumKeyValues } from '@common';
import { filesTypeKeys } from '../enums';
import { ItemBase } from './item';

export type FilesType = EnumKeyValues<typeof filesTypeKeys>;

export interface FilesItem extends ItemBase {
  name: string;
  type: FilesType;
  file_type: string;
  file_ext: string;
  file_size: number;
}

export type Files = FilesItem[];

export type FilesDetail = FilesItem & {};
