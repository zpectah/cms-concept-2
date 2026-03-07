import z from 'zod';
import { passwordRecoveryFormSchema } from './schema';
import { passwordRecoveryFormStatusKeys } from './enums';

export type IPasswordRecoveryForm = z.infer<typeof passwordRecoveryFormSchema>;

export type PasswordRecoveryFormStatus =
  keyof typeof passwordRecoveryFormStatusKeys;
