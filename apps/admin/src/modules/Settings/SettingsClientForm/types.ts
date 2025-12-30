import z from 'zod';
import { SettingsClientFormSchema } from './schema';

export type ISettingsClientForm = z.infer<typeof SettingsClientFormSchema>;
