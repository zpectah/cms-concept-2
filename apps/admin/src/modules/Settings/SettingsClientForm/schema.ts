import z from 'zod';
import { commonFieldSchema } from '../../../validation';

export const SettingsClientFormSchema = z.object({
  meta: z.object({
    title: commonFieldSchema.string_required,
    description: commonFieldSchema.string.optional(),
    keywords: commonFieldSchema.arrayOfString.optional(),
    robots: commonFieldSchema.string_required,
  }),
  state: z.object({
    debug: commonFieldSchema.boolean,
    maintenance: commonFieldSchema.boolean,
  }),
  messages: z.object({
    active: commonFieldSchema.boolean,
  }),
  comments: z.object({
    active: commonFieldSchema.boolean,
  }),
  email: z.object({
    smtp: z.object({
      port: commonFieldSchema.stringOrNumber,
      host: commonFieldSchema.string,
      username: commonFieldSchema.string,
      password: commonFieldSchema.string.optional(),
    }),
  }),
});
