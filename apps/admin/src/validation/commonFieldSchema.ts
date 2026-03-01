import z from 'zod';
import dayjs from 'dayjs';
import i18next from 'i18next';

const commonStringMinLength = 3;

export const commonFieldSchema = {
  /** Common string */
  string: z.string({
    error: () => i18next.t('form:message.error.invalid_string'),
  }),
  /** Required string */
  string_required: z
    .string({ error: () => i18next.t('form:message.error.required') })
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      error: () => i18next.t('form:message.error.required'),
    }),
  /** Required string with min. length 3 */
  string_minLength: z
    .string({ error: () => i18next.t('form:message.error.required') })
    .transform((val) => val.trim())
    .refine((val) => val.length > commonStringMinLength, {
      error: () => i18next.t('form:message.error.required'),
    }),
  /** Required string or number */
  stringOrNumber_required: z
    .union([
      z.string({ error: () => i18next.t('form:message.error.invalid_string') }),
      z.number({ error: () => i18next.t('form:message.error.invalid_number') }),
    ])
    .transform((val) => String(val))
    .refine((val) => val.length > 0, {
      error: () => i18next.t('form:message.error.required'),
    }),
  /** Common number */
  number: z.number({
    error: () => i18next.t('form:message.error.invalid_number'),
  }),
  /** Common email */
  email: z.email({
    error: () => i18next.t('form:message.error.invalid_email_format'),
  }),
  /** Required email */
  email_required: z
    .string({ error: () => i18next.t('form:message.error.required') })
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      error: () => i18next.t('form:message.error.required'),
    })
    .pipe(
      z.email({
        error: () => i18next.t('form:message.error.invalid_email_format'),
      })
    ),
  /** Common boolean */
  boolean: z.boolean({
    error: () => i18next.t('form:message.error.invalid_boolean'),
  }),
  /** Common date */
  date: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      error: () => i18next.t('form:message.error.invalid_date'),
    })
    .nullish(),
  /** Common date and time */
  dateTime: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      error: () => i18next.t('form:message.error.invalid_date_time'),
    })
    .nullish(),
  /** Common string or number */
  stringOrNumber: z.union([
    z.string({ error: () => i18next.t('form:message.error.invalid_string') }),
    z.number({ error: () => i18next.t('form:message.error.invalid_number') }),
  ]),
  /** Common array of numbers */
  arrayOfNumber: z.array(
    z.number({ error: () => i18next.t('form:message.error.invalid_number') }),
    {
      error: () => i18next.t('form:message.error.invalid_array'),
    }
  ),
  /** Common array of strings */
  arrayOfString: z.array(
    z.string({ error: () => i18next.t('form:message.error.invalid_string') }),
    {
      error: () => i18next.t('form:message.error.invalid_array'),
    }
  ),
  /** Common array of numbers or strings */
  arrayOfNumberOrString: z.array(
    z.union([
      z.string({ error: () => i18next.t('form:message.error.invalid_string') }),
      z.number({ error: () => i18next.t('form:message.error.invalid_number') }),
    ]),
    { error: () => i18next.t('form:message.error.invalid_array') }
  ),
};
