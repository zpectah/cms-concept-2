import z from 'zod';
import { SettingsGlobalFormSchema } from './schema';

export type ISettingsGlobalForm = z.infer<typeof SettingsGlobalFormSchema>;
