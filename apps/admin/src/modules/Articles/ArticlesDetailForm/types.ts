import z from 'zod';
import { articlesDetailFormSchema } from './schema';

export type IArticlesDetailForm = z.infer<typeof articlesDetailFormSchema>;
