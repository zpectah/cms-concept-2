import { filesCreateContextKeys } from '../enums';

export type FilesCreateContext = keyof typeof filesCreateContextKeys;

export interface FilesCreateTransportRequest {
  /** Files queue to upload */
  queue: any[]; // TODO: files
  options: {
    /** Uploading context */
    context: FilesCreateContext;
    /** Target for uploads */
    target: string;
  };
}
