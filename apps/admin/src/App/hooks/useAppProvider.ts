import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createSystem, defaultConfig } from '@chakra-ui/react';
import { uiConfig } from '../../styles';

const queryClient = new QueryClient();
const systemContext = createSystem(defaultConfig, uiConfig);

export const useAppProvider = () => {
  const [pageTitle, setPageTitle] = useState<string>('...');

  return {
    pageTitle,
    setPageTitle,
    queryClient,
    systemContext,
  };
};
