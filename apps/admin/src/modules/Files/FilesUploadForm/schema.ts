import z from 'zod';
import { filesTypeKeysArray, filesUploadContextKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

const filesUploadQueueItemSchema = z.object({
  content: commonFieldSchema.string_required,
  mime: commonFieldSchema.string_required,
  size: commonFieldSchema.number,
  name: commonFieldSchema.string_required,
  extension: commonFieldSchema.string_required,
  type: z.enum(filesTypeKeysArray),
  uid: commonFieldSchema.string_required,
  context: z.enum(filesUploadContextKeysArray),
  explicit: commonFieldSchema.boolean.optional(),
});

const filesUploadQueueSchema = z.array(filesUploadQueueItemSchema);

const filesUploadOptionsSchema = z.object({
  target: commonFieldSchema.string_required,
  context: z.enum(filesUploadContextKeysArray),
});

export const filesUploadFormSchema = z.object({
  queue: filesUploadQueueSchema,
  options: filesUploadOptionsSchema,
});
