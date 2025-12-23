import { getConfig } from '../config';

export const getFormatByLocale = (locale: string) => {
  const { locales } = getConfig();

  const typedLocales = locales as Record<
    string,
    { format: { date: string; time: string } }
  >;

  return typedLocales[locale].format;
};
