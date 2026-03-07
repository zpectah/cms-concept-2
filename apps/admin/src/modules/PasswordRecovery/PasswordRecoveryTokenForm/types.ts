import z from 'zod';
import { passwordRecoveryTokenFormSchema } from './schema';
import { passwordRecoveryTokenFormStatusKeys } from './enums';

export type IPasswordRecoveryTokenForm = z.infer<
  typeof passwordRecoveryTokenFormSchema
>;

export type PasswordRecoveryTokenFormStatus =
  keyof typeof passwordRecoveryTokenFormStatusKeys;
