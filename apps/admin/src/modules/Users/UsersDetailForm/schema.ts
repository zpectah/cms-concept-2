import z from 'zod';
import { usersTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

export const usersDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(usersTypeKeysArray),
  email: commonFieldSchema.email_required,
  password: commonFieldSchema.string.optional(),
  first_name: commonFieldSchema.string,
  last_name: commonFieldSchema.string,
  access_rights: commonFieldSchema.number,
  avatar_image: commonFieldSchema.string.optional(),
  avatar_hash: commonFieldSchema.string.optional(),
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
