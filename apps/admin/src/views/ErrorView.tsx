import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppContext } from '../contexts';
import { ViewLayout, Button } from '../components';

interface ErrorViewProps {
  code?: number;
}

const ErrorView = ({ code }: ErrorViewProps) => {
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Error 404');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO

  return (
    <ViewLayout variant="centered">
      <Box>
        ...Error view...{code}
        <Button variant="outline">Button</Button>
      </Box>
    </ViewLayout>
  );
};

export default ErrorView;
