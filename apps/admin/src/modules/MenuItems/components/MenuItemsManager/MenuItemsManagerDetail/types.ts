import z from 'zod';
import { menuItemsDetailFormSchema } from './schema';

export type IMenuItemsDetailForm = z.infer<typeof menuItemsDetailFormSchema>;
