import z from 'zod';
import { commonFieldSchema } from '../../../validation';

export const loginFormSchema = z.object({
  email: commonFieldSchema.email_required,
  password: commonFieldSchema.string_required,
});
