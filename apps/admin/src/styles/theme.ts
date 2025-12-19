import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {},
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        html: {
          fontSize: '16px',
        },
        body: {
          fontSize: '1rem',
        },
        'html, body': {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      }),
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '.25rem',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '1rem',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        slotProps: {
          title: {
            variant: 'h4',
          },
        },
      },
    },
    MuiFormLabel: {},
  },
});

export default theme;
