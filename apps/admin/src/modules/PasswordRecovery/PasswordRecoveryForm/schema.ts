import z from 'zod';
import { commonFieldSchema } from '../../../validation';

export const passwordRecoveryFormSchema = z.object({
  email: commonFieldSchema.email_required,
});
