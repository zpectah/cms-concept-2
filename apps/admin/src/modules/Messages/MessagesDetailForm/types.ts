import z from 'zod';
import { messagesDetailFormSchema } from './schema';

export type IMessagesDetailForm = z.infer<typeof messagesDetailFormSchema>;
