import z from 'zod';
import { pagesDetailFormSchema } from './schema';

export type IPagesDetailForm = z.infer<typeof pagesDetailFormSchema>;
