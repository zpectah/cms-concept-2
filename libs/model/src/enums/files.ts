export const filesTypeKeys = {
  unknown: 'unknown',
  unsupported: 'unsupported',
  image: 'image',
  audio: 'audio',
  video: 'video',
  document: 'document',
  archive: 'archive',
} as const;

export const filesUploadContextKeys = {
  default: 'default',
  user: 'user',
  member: 'member',
} as const;
