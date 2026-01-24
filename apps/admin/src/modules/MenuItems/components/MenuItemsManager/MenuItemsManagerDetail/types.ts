import z from 'zod';
import { menuItemsDetailFormSchema } from './schema';

export type IMenuItemsDetailFormSchema = z.infer<
  typeof menuItemsDetailFormSchema
>;
