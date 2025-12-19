import z from 'zod';
import { membersDetailFormSchema } from './schema';

export type IMembersDetailForm = z.infer<typeof membersDetailFormSchema>;
