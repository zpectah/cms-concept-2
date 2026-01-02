import z from 'zod';
import { menuTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

export const menuDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(menuTypeKeysArray),
  name: commonFieldSchema.string_required,
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
