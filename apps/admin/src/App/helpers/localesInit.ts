import { getConfig } from '../../config';
import { LOCALE_STORAGE_KEY } from '../../constants';

(function () {
  const {
    cms: { admin },
  } = getConfig();

  const root = document.querySelector('html') as HTMLElement;
  const locale =
    window.localStorage.getItem(LOCALE_STORAGE_KEY) ?? admin.locale.default;

  root.setAttribute('lang', locale);
})();
