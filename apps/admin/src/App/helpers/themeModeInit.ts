import { getConfig } from '../../config';
import { themeModeKeys } from '../../enums';
import { THEME_MODE_KEY } from '../../constants';

(function () {
  const {
    cms: { admin },
  } = getConfig();

  const root = document.querySelector('html') as HTMLElement;
  const mode =
    window.localStorage.getItem(THEME_MODE_KEY) ?? admin.theme.default;

  root.classList.remove(themeModeKeys.dark, themeModeKeys.light);
  root.classList.add(mode);
})();
