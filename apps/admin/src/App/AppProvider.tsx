import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { WithChildren } from '@common';
import { AppContextProvider } from '../contexts';
import { useAppProvider } from './hooks';

interface AppProviderProps extends WithChildren {
  test?: string;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const { queryClient, systemContext, ...appContext } = useAppProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={systemContext}>
        <AppContextProvider value={{ ...appContext }}>
          {children}
        </AppContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
