import { QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { WithChildren } from '@common';
import { AppContextProvider } from '../contexts';
import { theme } from '../styles';
import { useAppProvider } from './hooks';

interface AppProviderProps extends WithChildren {
  test?: string;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const { appContext, queryClient } = useAppProvider();

  return (
    <AppContextProvider value={appContext}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </AppContextProvider>
  );
};

export default AppProvider;
