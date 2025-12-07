import { useMemo } from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { EmptyState, VStack, Text } from '@chakra-ui/react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { getConfig } from '../config';

const ErrorBoundary = () => {
  const { routes } = getConfig();
  const error = useRouteError();

  const errorMessage = useMemo(() => {
    let message: string;

    if (isRouteErrorResponse(error)) {
      message =
        (error as { error?: { message?: string } })?.error?.message ||
        error.statusText;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Unknown error';
    }

    console.error(error);

    return message;
  }, [error]);

  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <IconAlertTriangle />
        </EmptyState.Indicator>
        <VStack>
          <EmptyState.Title>System Error</EmptyState.Title>
          <EmptyState.Description>
            Sorry, an unexpected error has occurred
          </EmptyState.Description>
          <Text>{errorMessage}</Text>
          <div>
            <Link to={routes.base.root}>Return</Link>
          </div>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default ErrorBoundary;
