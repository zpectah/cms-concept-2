import { useColorScheme } from '@mui/material';
import { themeModeKeys } from '../enums';
import { ThemeMode } from '../types';

export const useThemeMode = () => {
  const { mode, setMode } = useColorScheme();

  const setModeHandler = (mode: ThemeMode) => setMode(mode);

  const themeModeToggle = () => {
    let newMode;

    switch (mode) {
      case themeModeKeys.dark:
        newMode = themeModeKeys.light;
        break;

      case themeModeKeys.light:
        newMode = themeModeKeys.dark;
        break;

      case themeModeKeys.system:
      default:
        newMode = themeModeKeys.light;
        break;
    }

    setMode(newMode);
  };

  return {
    mode,
    onChange: setModeHandler,
    onToggle: themeModeToggle,
  };
};
