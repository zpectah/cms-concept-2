import z from 'zod';
import i18next from 'i18next';
import { menuItemsTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../../../validation';

const LocaleSchema = z.record(
  z.string(),
  z.object({
    label: commonFieldSchema.string_required,
  })
);

export const menuItemsDetailFormSchema = z
  .object({
    id: commonFieldSchema.number,
    uid: commonFieldSchema.string_required,
    name: commonFieldSchema.string_required,
    type: z.enum(menuItemsTypeKeysArray),
    active: commonFieldSchema.boolean.optional(),
    deleted: commonFieldSchema.boolean.optional(),
    created: commonFieldSchema.string.optional(),
    updated: commonFieldSchema.string.optional(),
    locale: LocaleSchema,
    menu_id: commonFieldSchema.number,
    parent_id: commonFieldSchema.number,
    link_page: commonFieldSchema.number,
    link_url: commonFieldSchema.string.optional(),
    item_order: commonFieldSchema.number,
  })
  .superRefine((model, context) => {
    const isPage = model.type === 'page';
    const isLink = model.type === 'link';

    if (isPage) {
      if (model.link_page === 0) {
        context.addIssue({
          code: 'custom',
          path: ['link_page'],
          message: i18next.t('form:message.error.required'),
        });
      }
    }

    if (isLink) {
      if (model.link_url === '') {
        context.addIssue({
          code: 'custom',
          path: ['link_url'],
          message: i18next.t('form:message.error.required'),
        });
      }
    }
  });
