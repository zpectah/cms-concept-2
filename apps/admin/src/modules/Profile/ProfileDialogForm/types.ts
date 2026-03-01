import z from 'zod';
import { profileDialogFormSchema } from './schema';

export type IProfileDialogForm = z.infer<typeof profileDialogFormSchema>;
