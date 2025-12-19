import z from 'zod';
import { tagsDetailFormSchema } from './schema';

export type ITagsDetailForm = z.infer<typeof tagsDetailFormSchema>;
