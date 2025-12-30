import { useState, useEffect } from 'react';
import { getConfig } from '../config';
import { useSettingsQuery } from '../query';

export const useDetailFormLocales = () => {
  const {
    cms: { admin },
  } = getConfig();

  const [locales, setLocales] = useState<string[]>([]);
  const [locale, setLocale] = useState<string>(admin.locale.default);

  const { settingsQuery } = useSettingsQuery();

  const { data: settingsData } = settingsQuery;

  useEffect(() => {
    if (settingsData) {
      setLocales(settingsData.locales.active);
      setLocale(settingsData.locales.default);
    }
  }, [settingsData]);

  return {
    locales,
    locale,
    onLocaleChange: setLocale,
  };
};
