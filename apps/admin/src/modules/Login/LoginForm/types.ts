import z from 'zod';
import { loginFormSchema } from './schema';

export type ILoginForm = z.infer<typeof loginFormSchema>;
