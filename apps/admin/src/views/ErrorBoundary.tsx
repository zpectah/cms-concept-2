import { useMemo } from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { EmptyState, VStack, Text, Card } from '@chakra-ui/react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { Button } from '../components';
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
    <div style={{ height: '100dvh', display: 'flex', alignItems: 'center' }}>
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
            <div style={{ width: '75dvw' }}>
              <Card.Root size="sm">
                <Card.Body style={{ textAlign: 'center' }}>
                  <Text>{errorMessage}</Text>
                </Card.Body>
              </Card.Root>
            </div>
            <div>
              <Button asChild>
                <Link to={routes.base.root}>Return</Link>
              </Button>
            </div>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </div>
  );
};

export default ErrorBoundary;
