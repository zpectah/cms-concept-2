import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumb } from '@chakra-ui/react';
import { getConfig } from '../../config';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = () => {
  const {
    cms: { admin },
    routes,
    locales,
    multiLocale,
  } = getConfig();

  const { t, i18n } = useTranslation(['common']);
  const { id, panel } = useParams();
  const { pathname } = useLocation();

  const attrs = pathname.split('/').filter(Boolean);
  const routeName = attrs[0];

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to={routes.dashboard.root}>{admin.meta.title}</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        {multiLocale && (
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              {
                (locales as Record<string, { label: string }>)[i18n.language]
                  .label
              }
            </Breadcrumb.Item>
          </>
        )}
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to={`/${routeName}`}>{t(`routes.${routeName}`)}</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        {id && (
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link to={pathname}>{id === 'new' ? id : `#${id}`}</Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </>
        )}
        {panel && (
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link>{panel}</Breadcrumb.Link>
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export default Breadcrumbs;
