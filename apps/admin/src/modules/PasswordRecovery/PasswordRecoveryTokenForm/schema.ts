import z from 'zod';
import { commonFieldSchema } from '../../../validation';

export const passwordRecoveryTokenFormSchema = z.object({
  token: commonFieldSchema.string_required,
  email: commonFieldSchema.email_required,
  password: commonFieldSchema.string_required,
});
