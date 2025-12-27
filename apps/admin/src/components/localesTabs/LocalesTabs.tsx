import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LocalesTabsProps } from './types';
import { getConfig } from '../../config';

const LocalesTabs = ({
  locales,
  locale,
  render,
  onLocaleChange,
}: LocalesTabsProps) => {
  const { locales: cfgLocales } = getConfig();

  return (
    <Stack direction="column" gap={1}>
      <ToggleButtonGroup value={locale} size="small">
        {locales.map((loc) => (
          <ToggleButton
            key={loc}
            value={loc}
            type="button"
            onClick={() => onLocaleChange(loc)}
          >
            &nbsp;
            {(cfgLocales as Record<string, { label: string }>)[loc].label}
            &nbsp;
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {locales.map((loc) => {
        if (locale !== loc) return null;

        return <Box key={loc}>{render(loc)}</Box>;
      })}
    </Stack>
  );
};

export default LocalesTabs;
