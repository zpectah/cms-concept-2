import z from 'zod';
import { categoriesDetailFormSchema } from './schema';

export type ICategoriesDetailForm = z.infer<typeof categoriesDetailFormSchema>;
