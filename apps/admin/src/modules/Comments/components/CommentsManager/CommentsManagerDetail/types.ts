import z from 'zod';
import { commentsManagerDetailFormSchema } from './schema';

export type ICommentsManagerDetailForm = z.infer<
  typeof commentsManagerDetailFormSchema
>;
