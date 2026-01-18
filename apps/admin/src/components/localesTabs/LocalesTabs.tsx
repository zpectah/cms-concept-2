import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getConfig } from '../../config';
import { ProjectLocales } from '../../types';
import { SPACING } from '../../constants';
import { LocalesTabsProps } from './types';

const LocalesTabs = ({
  locales,
  locale,
  render,
  onLocaleChange,
  boxProps,
}: LocalesTabsProps) => {
  const { locales: cfgLocales } = getConfig();

  const isSingleLocale = locales.length === 1;

  return (
    <Stack direction="column" gap={SPACING.form}>
      {!isSingleLocale && (
        <ToggleButtonGroup value={locale} size="small">
          {locales.map((loc) => (
            <ToggleButton
              key={loc}
              value={loc}
              type="button"
              onClick={() => onLocaleChange(loc)}
            >
              &nbsp;
              {(cfgLocales as ProjectLocales)[loc].label}
              &nbsp;
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
      {locales.map((loc) => {
        if (locale !== loc) return null;

        return (
          <Box key={loc} {...boxProps}>
            {render(loc)}
          </Box>
        );
      })}
    </Stack>
  );
};

export default LocalesTabs;
