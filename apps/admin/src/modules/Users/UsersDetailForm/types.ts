import z from 'zod';
import { usersDetailFormSchema } from './schema';

export type IUsersDetailForm = z.infer<typeof usersDetailFormSchema>;
