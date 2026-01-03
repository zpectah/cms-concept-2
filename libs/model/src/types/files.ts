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

export interface FilesQueueItem {
  content: string;
  mime: string;
  size: number;
  name: string;
  extension: string;
  type: FilesType;
  uid: string;
  context: FilesUploadContext;
  explicit: boolean;
}

export type FilesQueue = FilesQueueItem[];

export interface FilesUploadRequest {
  /** Files queue to upload */
  queue: FilesQueue;
  options: {
    /** Uploading context */
    context: FilesUploadContext;
    /** Target for uploads */
    target: string;
  };
}
