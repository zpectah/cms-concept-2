import { FilesQueue, FilesUploadContext } from '@model';

export interface UseFileUploadProps {
  isMultiple?: boolean;
  onQueueChange?: (queue: FilesQueue) => void;
  onLoadEnd?: () => void;
  onLoad?: () => void;
  onError?: (error: unknown) => void;
  context?: FilesUploadContext;
}

interface AvatarUploaderBase {
  /** User Uid */
  userUid?: string;
  /** or Member Uid */
  memberUid?: string;
  /** File name of avatar if exist */
  filename?: string;
  /** Callback after file is submitted */
  onComplete?: (filename: string) => void;
}

export interface AvatarUploaderProps extends AvatarUploaderBase {
  size?: string;
}

export type UseAvatarUploaderProps = AvatarUploaderBase & {};
