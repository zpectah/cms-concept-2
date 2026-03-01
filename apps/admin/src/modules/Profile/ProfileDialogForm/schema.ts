import z from 'zod';
import { commonFieldSchema } from '../../../validation';

export const profileDialogFormSchema = z.object({
  id: commonFieldSchema.number,
  email: commonFieldSchema.email_required,
  password: commonFieldSchema.string.optional(),
  first_name: commonFieldSchema.string,
  last_name: commonFieldSchema.string,
  avatar_image: commonFieldSchema.string.optional(),
});
