import z from 'zod';
import { commonFieldSchema } from '../../../validation';
import { AddressSchema, GpsLocationSchema } from '../../../schema';

export const SettingsGlobalFormSchema = z.object({
  project: z.object({
    name: commonFieldSchema.string_required,
    description: commonFieldSchema.string.optional(),
  }),
  company: z.object({
    name: commonFieldSchema.string.optional(),
    description: commonFieldSchema.string.optional(),
    id: commonFieldSchema.string.optional(),
    email: commonFieldSchema.arrayOfString.optional(),
    phone: commonFieldSchema.arrayOfNumberOrString.optional(),
    address: AddressSchema.optional(),
    location: GpsLocationSchema.optional(),
    bank: commonFieldSchema.string.optional(),
  }),
});
