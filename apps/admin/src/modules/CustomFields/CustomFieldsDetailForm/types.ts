import z from 'zod';
import { customFieldsDetailFormSchema } from './schema';

export type ICustomFieldsDetailForm = z.infer<typeof customFieldsDetailFormSchema>;
