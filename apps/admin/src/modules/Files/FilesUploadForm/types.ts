import z from 'zod';
import { filesUploadFormSchema } from './schema';

export type IFilesUploadForm = z.infer<typeof filesUploadFormSchema>;
