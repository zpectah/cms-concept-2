import z from 'zod';
import dayjs from 'dayjs';
import i18next from 'i18next';

const commonStringMinLength = 3;

export const commonFieldSchema = {
  /** Common string */
  string: z.string({
    error: () => i18next.t('form:message.error.invalidString'),
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
  /** Common number */
  number: z.number({
    error: () => i18next.t('form:message.error.invalidNumber'),
  }),
  /** Common email */
  email: z.email({
    error: () => i18next.t('form:message.error.emailFormat'),
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
        error: () => i18next.t('form:message.error.emailFormat'),
      })
    ),
  /** Common boolean */
  boolean: z.boolean({
    error: () => i18next.t('form:message.error.invalidBoolean'),
  }),
  /** Common date */
  date: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      error: () => i18next.t('form:message.error.invalidDate'),
    })
    .nullable(),
  /** Common date and time */
  dateTime: z
    .custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
      error: () => i18next.t('form:message.error.invalidDateTime'),
    })
    .nullable(),
  /** Common string or number */
  stringOrNumber: z.union([
    z.string({ error: () => i18next.t('form:message.error.invalidString') }),
    z.number({ error: () => i18next.t('form:message.error.invalidNumber') }),
  ]),
  /** Common array of numbers */
  arrayOfNumber: z.array(
    z.number({ error: () => i18next.t('form:message.error.invalidNumber') }),
    {
      error: () => i18next.t('form:message.error.invalidArray'),
    }
  ),
  /** Common array of strings */
  arrayOfString: z.array(
    z.string({ error: () => i18next.t('form:message.error.invalidString') }),
    {
      error: () => i18next.t('form:message.error.invalidArray'),
    }
  ),
  /** Common array of numbers or strings */
  arrayOfNumberOrString: z.array(
    z.union([
      z.string({ error: () => i18next.t('form:message.error.invalidString') }),
      z.number({ error: () => i18next.t('form:message.error.invalidNumber') }),
    ]),
    { error: () => i18next.t('form:message.error.invalidArray') }
  ),
};
