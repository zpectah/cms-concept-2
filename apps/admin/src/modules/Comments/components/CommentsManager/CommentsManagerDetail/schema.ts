import z from 'zod';
import { commentsTypeKeysArray, redactionModelKeysArray } from '@model';
import { commonFieldSchema } from '../../../../../validation';

export const commentsManagerDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(commentsTypeKeysArray),
  sender: commonFieldSchema.email_required,
  subject: commonFieldSchema.string_required,
  content: commonFieldSchema.string_required,
  parent_id: commonFieldSchema.number,
  content_type: z.enum(redactionModelKeysArray),
  content_id: commonFieldSchema.number,
  reported: commonFieldSchema.boolean,
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
