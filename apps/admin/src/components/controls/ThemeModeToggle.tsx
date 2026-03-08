import { useTranslation } from 'react-i18next';
import { IconSun, IconMoon, IconBrightness } from '@tabler/icons-react';
import { useThemeMode } from '../../hooks';
import { themeModeKeys } from '../../enums';
import { IconButtonPlus } from '../ui';

const ThemeModeToggle = () => {
  const { t } = useTranslation(['common']);
  const { mode, onToggle } = useThemeMode();

  return (
    <IconButtonPlus tooltip={t('label.themeMode')} onClick={onToggle}>
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
