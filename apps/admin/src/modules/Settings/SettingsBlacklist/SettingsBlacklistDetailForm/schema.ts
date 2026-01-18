import z from 'zod';
import i18next from 'i18next';
import { blacklistTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../../validation';
import { VALID_EMAIL_REGEX } from '../../../../constants';

export const settingsBlacklistDetailFormSchema = z
  .object({
    id: commonFieldSchema.number,
    type: z.enum(blacklistTypeKeysArray),
    email: commonFieldSchema.string.optional(),
    ipaddress: commonFieldSchema.string.optional(),
    active: commonFieldSchema.boolean,
    deleted: commonFieldSchema.boolean,
    created: commonFieldSchema.string.optional(),
  })
  .superRefine((model, context) => {
    if (!model.email && !model.ipaddress) {
      context.addIssue({
        code: 'custom',
        path: ['email'],
        message: i18next.t('form:message.error.required'),
      });
      context.addIssue({
        code: 'custom',
        path: ['ipaddress'],
        message: i18next.t('form:message.error.required'),
      });
    }

    if (model.email && model.email !== '' && model.email.length > 3) {
      if (!VALID_EMAIL_REGEX.test(model.email))
        context.addIssue({
          code: 'custom',
          path: ['email'],
          message: i18next.t('form:message.error.invalid_email_format'),
        });
    }

    if (
      model.ipaddress &&
      model.ipaddress !== '' &&
      model.ipaddress.length < 5
    ) {
      context.addIssue({
        code: 'custom',
        path: ['ipaddress'],
        message: i18next.t('form:message.error.invalid_format'),
      });
    }
  });
