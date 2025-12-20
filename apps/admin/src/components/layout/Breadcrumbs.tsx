import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { getConfig } from '../../config';

const Breadcrumbs = () => {
  const {
    routes,
    locales,
    cms: { meta },
  } = getConfig();

  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const attrs = pathname.split('/').filter(Boolean);
  const routeName = attrs[0];
  const subRouteType = attrs[1];
  const subRouteName = attrs[2];
  const root = (routes as Record<string, { root: string }>)[routeName].root;

  const localeLabel = (locales as Record<string, { label: string }>)[
    i18n.language
  ].label;
  const routeLabel = t(`routes.${routeName}`);
  const panelName = t(`panels.${subRouteName}`);

  return (
    <div role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Typography variant="button" sx={{ color: 'text.primary' }}>
          {meta.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {localeLabel}
        </Typography>

        <Link variant="body2" underline="hover" color="inherit" href={root}>
          {routeLabel}
        </Link>
        {subRouteType === 'id' && (
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {subRouteName === 'new' ? subRouteName : `#${subRouteName}`}
          </Typography>
        )}
        {subRouteType === 'panel' && (
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {panelName}
          </Typography>
        )}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
