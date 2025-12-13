import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { CONTAINER_WIDTH_DEFAULT } from '../../constants';
import { ContainerProps } from '@mui/material';

const queryClient = new QueryClient();

export const useAppProvider = () => {
  const [pageTitle, setPageTitle] = useState<string>('CMS concept | Admin');
  const [containerWidth, setContainerWidth] = useState<
    ContainerProps['maxWidth']
  >(CONTAINER_WIDTH_DEFAULT);

  return {
    queryClient,
    appContext: {
      pageTitle,
      setPageTitle,
      containerWidth,
      setContainerWidth,
    },
  };
};
