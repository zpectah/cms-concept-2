import { useTheme } from '@mui/material/styles';
import { useMediaQuery as useMuiMediaQuery } from '@mui/material';

export const useMediaQuery = () => {
  const theme = useTheme();
  const up_xs = useMuiMediaQuery(theme.breakpoints.up('xs'));
  const up_sm = useMuiMediaQuery(theme.breakpoints.up('sm'));
  const up_md = useMuiMediaQuery(theme.breakpoints.up('md'));
  const up_lg = useMuiMediaQuery(theme.breakpoints.up('lg'));
  const up_xl = useMuiMediaQuery(theme.breakpoints.up('xl'));

  const down_xs = useMuiMediaQuery(theme.breakpoints.down('xs'));
  const down_sm = useMuiMediaQuery(theme.breakpoints.down('sm'));
  const down_md = useMuiMediaQuery(theme.breakpoints.down('md'));
  const down_lg = useMuiMediaQuery(theme.breakpoints.down('lg'));
  const down_xl = useMuiMediaQuery(theme.breakpoints.down('xl'));

  const getCurrent = () => {
    let current = 'xs';

    if (up_xs) current = 'xs';
    if (up_sm) current = 'sm';
    if (up_md) current = 'md';
    if (up_lg) current = 'lg';
    if (up_xl) current = 'xl';

    return current;
  };

  return {
    current: getCurrent(),
    up: {
      xs: up_xs,
      sm: up_sm,
      md: up_md,
      lg: up_lg,
      xl: up_xl,
    },
    down: {
      xs: down_xs,
      sm: down_sm,
      md: down_md,
      lg: down_lg,
      xl: down_xl,
    },
  };
};
