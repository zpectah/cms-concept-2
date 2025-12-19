import z from 'zod';
import { translationsDetailFormSchema } from './schema';

export type ITranslationsDetailForm = z.infer<typeof translationsDetailFormSchema>;
