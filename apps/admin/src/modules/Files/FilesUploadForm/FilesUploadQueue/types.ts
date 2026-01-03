import { FilesQueueItem } from '@model';

export interface FilesUploadQueueItemProps extends FilesQueueItem {
  index: number;
  onRemove: (index: number) => void;
}
