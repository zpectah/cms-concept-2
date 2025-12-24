import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {},
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 800,
      letterSpacing: '-.025em',
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.45rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.15rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 300,
    },
    subtitle2: {
      fontWeight: 300,
      textTransform: 'uppercase',
    },
    body1: {
      // fontSize: '1rem',
      // fontWeight: 400,
    },
    body2: {
      fontSize: '.925rem',
    },
    caption: {},
    button: {
      fontSize: '.9rem',
      fontWeight: 700,
      textTransform: 'none',
    },
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono Variable", monospace',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {},
          textarea: {},
        },
      },
      defaultProps: {},
    },
    MuiSelect: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {},
    },
  },
});

export default theme;
