import z from 'zod';
import { menuDetailFormSchema } from './schema';

export type IMenuDetailForm = z.infer<typeof menuDetailFormSchema>;
