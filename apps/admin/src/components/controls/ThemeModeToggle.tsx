import { SvgIconProps } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useThemeMode } from '../../hooks';
import { themeModeKeys } from '../../enums';
import { IconButtonPlus } from '../ui';

const ThemeModeToggle = () => {
  const { mode, onToggle } = useThemeMode();

  const commonIconProps: Partial<SvgIconProps> = {
    color: 'inherit',
  };

  return (
    <IconButtonPlus tooltip="Theme mode" onClick={onToggle}>
      {mode ? (
        {
          [themeModeKeys.light]: <LightModeIcon {...commonIconProps} />,
          [themeModeKeys.dark]: <DarkModeIcon {...commonIconProps} />,
          [themeModeKeys.system]: (
            <SettingsBrightnessIcon {...commonIconProps} />
          ),
        }[mode]
      ) : (
        <SettingsBrightnessIcon {...commonIconProps} />
      )}
    </IconButtonPlus>
  );
};

export default ThemeModeToggle;
