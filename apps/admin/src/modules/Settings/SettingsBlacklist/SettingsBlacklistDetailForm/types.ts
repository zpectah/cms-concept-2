import z from 'zod';
import { settingsBlacklistDetailFormSchema } from './schema';

export type ISettingsBlacklistDetailForm = z.infer<
  typeof settingsBlacklistDetailFormSchema
>;
