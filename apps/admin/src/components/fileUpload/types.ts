import { FilesQueue } from '@model';

export interface UseFileUploadProps {
  isMultiple?: boolean;
  onQueueChange?: (queue: FilesQueue) => void;
  onLoadEnd?: () => void;
  onLoad?: () => void;
  onError?: (error: unknown) => void;
}
