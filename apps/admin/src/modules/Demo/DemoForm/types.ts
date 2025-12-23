import z from 'zod';
import { demoFormSchema } from './schema';

export type IDemoForm = z.infer<typeof demoFormSchema>;
