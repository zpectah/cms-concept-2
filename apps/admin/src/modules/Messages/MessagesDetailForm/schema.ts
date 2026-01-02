import z from 'zod';
import { messagesTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

export const messagesDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(messagesTypeKeysArray),
  name: commonFieldSchema.string_required,
  sender: commonFieldSchema.email_required,
  subject: commonFieldSchema.string_required,
  content: commonFieldSchema.string_required,
  read: commonFieldSchema.boolean.optional(),
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
