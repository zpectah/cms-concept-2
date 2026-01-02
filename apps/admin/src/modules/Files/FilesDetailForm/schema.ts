import z from 'zod';
import { filesTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

export const filesDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(filesTypeKeysArray),
  name: commonFieldSchema.string_required,
  file_name: commonFieldSchema.string_required,
  file_type: commonFieldSchema.string_required,
  file_ext: commonFieldSchema.string_required,
  file_size: commonFieldSchema.number,
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
