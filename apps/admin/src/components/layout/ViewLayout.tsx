import { Suspense, useEffect } from 'react';
import { styled, Container, Stack, Typography } from '@mui/material';
import { getConfig } from '../../config';
import { classNames, setDocumentMeta } from '../../utils';
import { useAppContext } from '../../contexts';
import { viewLayoutVariantKeys } from '../../enums';
import { CONTAINER_WIDTH_DEFAULT, SPACING } from '../../constants';
import { ViewContextProvider } from '../../contexts';
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
  gap: theme.spacing(SPACING.body),
}));

const ViewHeading = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(SPACING.heading),
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
}: ViewLayoutProps) => {
  const {
    cms: {
      admin: { meta },
    },
  } = getConfig();

  const { setContainerWidth, setPageTitle } = useAppContext();
  const { listSelected, setListSelected } = useViewLayout();

  const isDefaultVariant = variant === viewLayoutVariantKeys.default;

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
    <ViewContextProvider
      value={{
        model,
        rootUrl: rootUrl ?? '',
        list: {
          selected: listSelected,
          setSelected: setListSelected,
        },
        detail: {
          /* TODO */
        },
        panels: {
          /* TODO */
        },
      }}
    >
      <Wrapper id="view-layout" className={classNames(`variant--${variant}`)}>
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
        {slot}
      </Wrapper>
    </ViewContextProvider>
  );
};

export default ViewLayout;
