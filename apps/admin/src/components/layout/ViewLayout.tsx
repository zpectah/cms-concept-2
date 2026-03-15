import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, Container, Stack, Typography, Box } from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons-react';
import { getRandomId } from '@common';
import { getConfig } from '../../config';
import { classNames, setDocumentMeta } from '../../utils';
import { useAppContext } from '../../contexts';
import { viewLayoutVariantKeys } from '../../enums';
import { CONTAINER_WIDTH_DEFAULT, SPACING } from '../../constants';
import { ViewContextProvider } from '../../contexts';
import { useUserActions } from '../../hooks';
import { LinkButton } from '../ui';
import { ViewLayoutProps } from './types';
import { useViewLayout } from './useViewLayout';
import Breadcrumbs from './Breadcrumbs';
import Preloader from './Preloader';
import Footer from './Footer';

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(SPACING.body),

  '&.variant--default': {},
  '&.variant--centered': {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ContainerContent = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(SPACING.content),
}));

const ViewHeading = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(SPACING.heading),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(SPACING.heading),
}));

const NavigationSlot = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ViewBody = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(SPACING.content),
  paddingBottom: theme.spacing(SPACING.content),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(SPACING.content),

  '.variant--default &': {},
  '.variant--centered &': {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const ViewLayout = ({
  children,
  slot,
  preloader,
  disableSuspense,
  containerProps,
  title,
  titleSlot,
  containerWidth = CONTAINER_WIDTH_DEFAULT,
  variant = viewLayoutVariantKeys.default,
  model,
  rootUrl,
  navigationSlot,
}: ViewLayoutProps) => {
  const {
    cms: {
      admin: { meta },
    },
    routes,
  } = getConfig();

  const { t } = useTranslation(['components']);
  const { setContainerWidth, setPageTitle } = useAppContext();
  const { listSelected, setListSelected } = useViewLayout();
  const { model: modelActions, modelGroup, isLoaded } = useUserActions(model);

  const isDefaultVariant = variant === viewLayoutVariantKeys.default;
  const vid = getRandomId(8);

  const contextValue = {
    model,
    modelGroup,
    rootUrl: rootUrl ?? '',
    vid,
    list: {
      selected: listSelected,
      setSelected: setListSelected,
    },
    detail: {},
    panels: {},
  };

  useEffect(() => {
    setContainerWidth(containerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  useEffect(() => {
    setPageTitle(title);

    let page_title = meta.title;

    if (title) page_title = `${title} | ${page_title}`;

    setDocumentMeta({ title: page_title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, meta]);

  return (
    <ViewContextProvider value={contextValue}>
      <Wrapper id="view-layout" className={classNames(`variant--${variant}`)}>
        {!modelActions.view ? (
          <Container maxWidth={containerWidth}>
            <ContainerContent>
              <Box
                sx={{
                  pt: '15vh',
                }}
              >
                <Stack alignItems="center" justifyContent="center" gap={6}>
                  <Stack alignItems="center" justifyContent="center" gap={2}>
                    {!isLoaded ? (
                      <Preloader />
                    ) : (
                      <>
                        <IconAlertTriangle />
                        <Typography variant="h3">
                          {t('components:viewLayout.message.noAccess.title')}
                        </Typography>
                        <Typography variant="body1">
                          {t('components:viewLayout.message.noAccess.content')}
                        </Typography>
                      </>
                    )}
                  </Stack>
                  <LinkButton to={routes.dashboard.root} variant="outlined">
                    {t('components:viewLayout.message.noAccess.action')}
                  </LinkButton>
                </Stack>
              </Box>
            </ContainerContent>
          </Container>
        ) : (
          <Container maxWidth={containerWidth} {...containerProps}>
            <ContainerContent>
              <ViewHeading>
                {isDefaultVariant && <Breadcrumbs />}
                <Stack
                  direction="row"
                  gap={2}
                  alignItems="center"
                  justifyContent={
                    title && titleSlot
                      ? 'space-between'
                      : isDefaultVariant
                      ? 'flex-start'
                      : 'center'
                  }
                >
                  {title && <Typography variant="h1">{title}</Typography>}
                  {titleSlot && (
                    <Stack direction="row" gap={2}>
                      {titleSlot}
                    </Stack>
                  )}
                </Stack>
              </ViewHeading>
              {navigationSlot && (
                <NavigationSlot>{navigationSlot}</NavigationSlot>
              )}
              <ViewBody>
                {disableSuspense ? (
                  children
                ) : (
                  <Suspense fallback={preloader ? preloader : <Preloader />}>
                    {children}
                  </Suspense>
                )}
                <Footer />
              </ViewBody>
            </ContainerContent>
          </Container>
        )}
        {slot}
      </Wrapper>
    </ViewContextProvider>
  );
};

export default ViewLayout;
