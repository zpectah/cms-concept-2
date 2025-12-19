import { IconSun, IconMoon, IconBrightness } from '@tabler/icons-react';
import { useThemeMode } from '../../hooks';
import { themeModeKeys } from '../../enums';
import { IconButtonPlus } from '../ui';

const ThemeModeToggle = () => {
  const { mode, onToggle } = useThemeMode();

  return (
    <IconButtonPlus tooltip="Theme mode" onClick={onToggle}>
      {mode ? (
        {
          [themeModeKeys.light]: <IconSun />,
          [themeModeKeys.dark]: <IconMoon />,
          [themeModeKeys.system]: <IconBrightness />,
        }[mode]
      ) : (
        <IconBrightness />
      )}
    </IconButtonPlus>
  );
};

export default ThemeModeToggle;
