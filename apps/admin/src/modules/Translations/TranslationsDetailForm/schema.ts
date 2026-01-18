import z from 'zod';
import {
  translationsTypeKeysArray,
  translationsNamespaceKeysArray,
} from '@model';
import { commonFieldSchema } from '../../../validation';

const LocaleSchema = z.record(
  z.string(),
  z.object({
    value: commonFieldSchema.string_required,
  })
);

export const translationsDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(translationsTypeKeysArray),
  namespace: z.enum(translationsNamespaceKeysArray),
  name: commonFieldSchema.string_required,
  locale: LocaleSchema,
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
