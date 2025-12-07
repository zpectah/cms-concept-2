import { IconButton } from '@chakra-ui/react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useThemeMode } from '../../hooks';

const ThemeModeToggle = () => {
  const { mode, onToggle } = useThemeMode();

  return (
    <IconButton variant="outline" onClick={onToggle} data-current={mode}>
      {mode === 'light' ? <IconSun /> : <IconMoon />}
    </IconButton>
  );
};

export default ThemeModeToggle;
