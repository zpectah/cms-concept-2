import z from 'zod';
import i18next from 'i18next';
import { pagesMetaRobotsKeys, pagesTypeKeys, pagesTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';

const LocaleSchema = z.record(
  z.string(),
  z.object({
    title: commonFieldSchema.string_required,
    description: commonFieldSchema.string,
    content: commonFieldSchema.string_required,
  })
);

export const pagesDetailFormSchema = z
  .object({
    id: commonFieldSchema.number,
    type: z.enum(pagesTypeKeysArray),
    name: commonFieldSchema.string_required,
    meta_robots: z.enum(pagesMetaRobotsKeys),
    category_id: commonFieldSchema.number,
    locale: LocaleSchema,
    active: commonFieldSchema.boolean.optional(),
    deleted: commonFieldSchema.boolean.optional(),
    created: commonFieldSchema.string.optional(),
    updated: commonFieldSchema.string.optional(),
  })
  .superRefine((model, context) => {
    const isCategory = model.type === pagesTypeKeys.category;

    if (isCategory) {
      if (model.category_id === 0) {
        context.addIssue({
          code: 'custom',
          path: ['category_id'],
          message: i18next.t('form:message.error.required'),
        });
      }
    }
  });
