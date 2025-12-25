import z from 'zod';
import { commonFieldSchema } from '../../../validation';

export const demoFormSchema = z.object({
  inputText: commonFieldSchema.string,
  inputEmail: commonFieldSchema.email,
  selectString: commonFieldSchema.string,
  selectNumber: commonFieldSchema.number,
  date: commonFieldSchema.date,
  dateTime: commonFieldSchema.dateTime,
  inputNumberA: commonFieldSchema.stringOrNumber,
  inputNumberB: commonFieldSchema.number,
  textarea: commonFieldSchema.string,
  wysiwyg: commonFieldSchema.string,
  /* TODO */
});
