import i18n from 'i18next';
// import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getConfig } from '../config';
import { LOCALE_STORAGE_KEY } from '../constants';
import locales from './locales';

const cfg = () => {
  const { cms } = getConfig();

  return {
    resources: locales,
    supportedLngs: cms.admin.locale.active,
    fallbackLng: cms.admin.locale.default,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  };
};

i18n
  // .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(cfg());
