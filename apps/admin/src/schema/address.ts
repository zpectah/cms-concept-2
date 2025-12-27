import z from 'zod';
import { commonFieldSchema } from '../validation';

export const AddressSchema = z.object({
  street: commonFieldSchema.string.optional(),
  street_no: commonFieldSchema.stringOrNumber.optional(),
  district: commonFieldSchema.string.optional(),
  city: commonFieldSchema.string.optional(),
  country: commonFieldSchema.string.optional(),
  zip: commonFieldSchema.stringOrNumber.optional(),
});
