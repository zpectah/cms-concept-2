import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { getConfig } from '../../config';
import { useBreadcrumbs } from '../../hooks';

const Breadcrumbs = () => {
  const {
    cms: { meta },
  } = getConfig();

  const {
    root,
    subRouteType,
    subRouteName,
    localeLabel,
    routeLabel,
    panelName,
  } = useBreadcrumbs();

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
