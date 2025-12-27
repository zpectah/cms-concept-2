import z from 'zod';
import { articlesTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

const detailLocalesSchema = z.record(
  commonFieldSchema.string,
  z.object({
    title: commonFieldSchema.string_required,
    description: commonFieldSchema.string,
    content: commonFieldSchema.string_required,
  })
);

export const articlesDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  active: commonFieldSchema.boolean,
  deleted: commonFieldSchema.boolean,
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
  //
  name: commonFieldSchema.string_required,
  type: z.enum(articlesTypeKeysArray),
  tags: commonFieldSchema.arrayOfNumber,
  categories: commonFieldSchema.arrayOfNumber,
  files: commonFieldSchema.arrayOfNumber,
  approved: commonFieldSchema.boolean,
  explicit: commonFieldSchema.boolean,
  author: commonFieldSchema.number,
  editor: commonFieldSchema.arrayOfNumber,
  locale: detailLocalesSchema,
  // Event specific
});
