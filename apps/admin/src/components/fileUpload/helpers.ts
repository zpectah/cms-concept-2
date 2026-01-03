import { filesTypeDefault, filesTypeKeys, FilesType } from '@model';
import { supportedFilesExtensions } from '../../constants';

export const getFileTypeFromExtension = (extension: string): FilesType => {
  const mapping: Record<string, string> = {
    image: filesTypeKeys.image,
    audio: filesTypeKeys.audio,
    video: filesTypeKeys.video,
    document: filesTypeKeys.document,
    archive: filesTypeKeys.archive,
  };

  for (const [key, type] of Object.entries(mapping)) {
    if (
      supportedFilesExtensions[
        key as keyof typeof supportedFilesExtensions
      ].includes(extension)
    ) {
      return type as FilesType;
    }
  }

  return filesTypeDefault;
};
