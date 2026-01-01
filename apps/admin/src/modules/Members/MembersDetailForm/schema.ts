import z from 'zod';
import { personSexKeysArray } from '@common';
import { membersTypeKeysArray } from '@model';
import { commonFieldSchema } from '../../../validation';
import { AddressSchema } from '../../../schema';

export const membersDetailFormSchema = z.object({
  id: commonFieldSchema.number,
  type: z.enum(membersTypeKeysArray),
  sex: z.enum(personSexKeysArray),
  email: commonFieldSchema.email_required,
  password: commonFieldSchema.string.optional(),
  first_name: commonFieldSchema.string,
  last_name: commonFieldSchema.string,
  address: AddressSchema.optional(),
  flat_no: commonFieldSchema.string.optional(),
  birthdate: commonFieldSchema.date.optional(),
  description: commonFieldSchema.string.optional(),
  active: commonFieldSchema.boolean.optional(),
  deleted: commonFieldSchema.boolean.optional(),
  created: commonFieldSchema.string.optional(),
  updated: commonFieldSchema.string.optional(),
});
