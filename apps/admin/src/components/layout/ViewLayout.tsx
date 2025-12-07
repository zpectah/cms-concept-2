import { Suspense, useEffect } from 'react';
import { Container, Heading, SkeletonText } from '@chakra-ui/react';
import { getConfig } from '../../config';
import { classNames } from '../../utils';
import { useAppContext } from '../../contexts';
import { viewLayoutVariantKeys } from '../../enums';
import { ViewLayoutProps } from './types';
import Preloader from './Preloader';
import Breadcrumbs from './Breadcrumbs';

/** Layout for wrap page for view **/

const ViewLayout = ({
  children,
  variant = viewLayoutVariantKeys.default,
  slot,
  containerProps,
  preloader,
  disableTitle,
  titleSlot,
  disableSuspense,
}: ViewLayoutProps) => {
  const {
    cms: {
      admin: { meta },
    },
  } = getConfig();

  const { pageTitle } = useAppContext();

  const descriptionElement = document.querySelector(
    "meta[name='description']"
  ) as HTMLElement;

  useEffect(() => {
    let title = meta.title;

    if (pageTitle) title = `${pageTitle} | ${title}`;

    document.title = title;
    descriptionElement.setAttribute('content', meta.description);
  }, [meta, pageTitle, descriptionElement]);

  return (
    <div id="view-layout" className={classNames('view-layout', variant)}>
      <Container {...containerProps}>
        <div className={classNames('view-layout-wrapper')}>
          <div className="view-layout-heading">
            {variant === viewLayoutVariantKeys.default && <Breadcrumbs />}
            <div className="view-layout-heading-title">
              {!disableTitle && (
                <Heading as="h2" size="3xl">
                  {pageTitle === '...' ? <SkeletonText /> : pageTitle}
                </Heading>
              )}
              {titleSlot}
            </div>
          </div>
          <div>
            {disableSuspense ? (
              children
            ) : (
              <Suspense fallback={preloader ? preloader : <Preloader />}>
                {children}
              </Suspense>
            )}
          </div>
        </div>
      </Container>
      {slot}
    </div>
  );
};

export default ViewLayout;
