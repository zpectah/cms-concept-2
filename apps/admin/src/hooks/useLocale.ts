import { useTranslation } from 'react-i18next';

export const useLocale = () => {
  const { i18n } = useTranslation();

  const changeHandler = (locale: string) => {
    const root = document.querySelector('html') as HTMLElement;

    i18n.changeLanguage(locale).then(() => {
      root.setAttribute('lang', locale);
    });
  };

  return {
    locale: i18n.language,
    onChange: changeHandler,
  };
};
