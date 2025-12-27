import z from 'zod';
import i18next from 'i18next';
import dayjs from 'dayjs';
import { articlesTypeKeys, articlesTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';
import { AddressSchema, GpsLocationSchema } from '../../../schema';

const detailLocalesSchema = z.record(
  commonFieldSchema.string,
  z.object({
    title: commonFieldSchema.string_required,
    description: commonFieldSchema.string,
    content: commonFieldSchema.string_required,
  })
);

export const articlesDetailFormSchema = z
  .object({
    id: commonFieldSchema.number,
    name: commonFieldSchema.string_required,
    active: commonFieldSchema.boolean,
    deleted: commonFieldSchema.boolean,
    created: commonFieldSchema.string.optional(),
    updated: commonFieldSchema.string.optional(),
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
    event_start: commonFieldSchema.dateTime.optional(),
    event_end: commonFieldSchema.dateTime.nullable().optional(),
    event_address: AddressSchema.optional(),
    event_location: GpsLocationSchema.optional(),
  })
  .superRefine((model, context) => {
    const isEvent = model.type === articlesTypeKeys.event;

    if (isEvent) {
      if (!model.event_start) {
        context.addIssue({
          code: 'custom',
          path: ['event_start'],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (!model.event_end) {
        context.addIssue({
          code: 'custom',
          path: ['event_end'],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (
        dayjs.isDayjs(model.event_start) &&
        dayjs.isDayjs(model.event_end) &&
        model.event_end.isBefore(model.event_start)
      ) {
        context.addIssue({
          code: 'custom',
          path: ['event_end'],
          message: i18next.t('form:message.error.endDateBeforeStartDate'),
        });
      }
    }
  });
