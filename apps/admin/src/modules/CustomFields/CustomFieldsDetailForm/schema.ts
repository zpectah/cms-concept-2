import z from 'zod';
import { customFieldsTypeKeys } from '@model';
import { commonFieldSchema } from '../../../validation';

export const customFieldsDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  name: commonFieldSchema.string_required,
  type: z.enum(customFieldsTypeKeys),
  active: commonFieldSchema.boolean,
  deleted: commonFieldSchema.boolean,
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
