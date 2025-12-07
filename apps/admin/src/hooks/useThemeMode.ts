import { useEffect, useState } from 'react';
import { getConfig } from '../config';
import { themeModeKeys } from '../enums';
import { ThemeMode } from '../types';
import { THEME_MODE_KEY } from '../constants';

export const useThemeMode = () => {
  const {
    cms: { admin },
  } = getConfig();
  const root = document.querySelector('html') as HTMLElement;

  const [mode, setMode] = useState(root.classList[0] ?? admin.theme.default);

  const isLight = () => root.classList.contains(themeModeKeys.light);

  const setModeHandler = (mode: ThemeMode) => {
    root.classList.remove(themeModeKeys.dark, themeModeKeys.light);
    root.classList.add(mode);
    window.localStorage.setItem(THEME_MODE_KEY, mode);
  };

  const modeToggleHandler = () => {
    const className = isLight() ? themeModeKeys.dark : themeModeKeys.light;

    setModeHandler(className);
  };

  const observerCallback = (mutations: MutationRecord[]) => {
    setMode(root.classList[0]);
  };

  useEffect(() => {
    const target = document.querySelector('html') as HTMLElement;
    const observer = new MutationObserver(observerCallback);

    observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    mode,
    onToggle: modeToggleHandler,
    onChange: setModeHandler,
  };
};
