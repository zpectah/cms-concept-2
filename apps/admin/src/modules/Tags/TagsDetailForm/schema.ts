import z from 'zod';
import { tagsColorKeysArray, tagsTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

export const tagsDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  name: commonFieldSchema.string_required,
  active: commonFieldSchema.boolean,
  deleted: commonFieldSchema.boolean,
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
  type: z.enum(tagsTypeKeysArray),
  color: z.enum(tagsColorKeysArray),
});
