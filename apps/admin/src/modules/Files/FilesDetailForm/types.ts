import z from 'zod';
import { filesDetailFormSchema } from './schema';

export type IFilesDetailForm = z.infer<typeof filesDetailFormSchema>;
