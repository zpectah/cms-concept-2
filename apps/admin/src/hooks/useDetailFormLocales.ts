import { useState, useEffect } from 'react';
import { getConfig } from '../config';

export const useDetailFormLocales = () => {
  const {
    cms: { admin },
  } = getConfig();

  const [locales, setLocales] = useState<string[]>([]);
  const [locale, setLocale] = useState<string>(admin.locale.default);

  // TODO
  const settingsData = {
    locales: {
      default: 'en',
      active: ['en', 'cs'],
    },
  };

  useEffect(() => {
    if (settingsData) {
      setLocales(settingsData.locales.active);
      setLocale(settingsData.locales.default);
    }
    // TODO: dependency
  }, []);

  return {
    locales,
    locale,
    onLocaleChange: setLocale,
  };
};
