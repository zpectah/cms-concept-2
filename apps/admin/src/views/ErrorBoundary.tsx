import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Box, Stack, Typography, styled } from '@mui/material';
import { getConfig } from '../config';
import { LinkButton } from '../components';

const WrapperOuter = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
}));

const WrapperInner = styled('main')({
  width: '100%',
  flex: 1,
  overflowY: 'auto',
  flexDirection: 'column',
});

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  gap: theme.spacing(4),
}));

const ErrorBoundary = () => {
  const { routes } = getConfig();

  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage =
      (error as { error?: { message?: string } })?.error?.message ||
      error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <WrapperOuter>
      <WrapperInner>
        <Content>
          <Box
            sx={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlign: 'center',
            }}
          >
            <Stack gap={4}>
              <Typography variant="h1">ERROR</Typography>
              <Typography variant="h3">
                Sorry, an unexpected error has occurred
              </Typography>
              <Typography variant="h5">{errorMessage}</Typography>

              <div>
                <LinkButton
                  variant="outlined"
                  size="large"
                  to={routes.login.root}
                >
                  Return
                </LinkButton>
              </div>
            </Stack>
          </Box>
        </Content>
      </WrapperInner>
    </WrapperOuter>
  );
};

export default ErrorBoundary;
