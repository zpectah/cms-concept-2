import { EnumKeyValues } from '@common';
import { filesTypeKeys, filesUploadContextKeys } from '../enums';
import { ItemBase } from './item';

export type FilesType = EnumKeyValues<typeof filesTypeKeys>;

export interface FilesItem extends ItemBase {
  name: string;
  type: FilesType;
  file_name: string;
  file_type: string;
  file_ext: string;
  file_size: number;
  explicit: boolean;
}

export type Files = FilesItem[];

export type FilesDetail = FilesItem & {};

export type FilesUploadContext = EnumKeyValues<typeof filesUploadContextKeys>;

export interface FilesUploadRequest {
  /** Files queue to upload */
  queue: Files;
  options: {
    /** Uploading context */
    context: FilesUploadContext;
    /** Target for uploads */
    target: string;
  };
}
