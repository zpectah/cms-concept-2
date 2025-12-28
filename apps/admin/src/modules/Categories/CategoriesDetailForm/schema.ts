import z from 'zod';
import { categoriesTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

const detailLocalesSchema = z.record(
  commonFieldSchema.string,
  z.object({
    title: commonFieldSchema.string_required,
    description: commonFieldSchema.string.optional(),
  })
);

export const categoriesDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  name: commonFieldSchema.string_required,
  active: commonFieldSchema.boolean,
  deleted: commonFieldSchema.boolean,
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
  type: z.enum(categoriesTypeKeysArray),
  parent_id: commonFieldSchema.number,
  locale: detailLocalesSchema,
});
