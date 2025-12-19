import z from 'zod';
import { passwordRecoveryFormSchema } from './schema';

export type IPasswordRecoveryForm = z.infer<typeof passwordRecoveryFormSchema>;
