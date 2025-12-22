import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toCamelCase } from '@common';
import { getConfig } from '../config';

export const useBreadcrumbs = () => {
  const { routes, locales } = getConfig();

  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const attrs = pathname.split('/').filter(Boolean);
  const routeName = attrs[0] && toCamelCase(attrs[0]);
  const subRouteType = attrs[1];
  const subRouteName =
    routeName === 'settings'
      ? toCamelCase(attrs[1])
      : attrs[2] && toCamelCase(attrs[2]);
  const root = (routes as Record<string, { root: string }>)[routeName].root;

  const localeLabel = (locales as Record<string, { label: string }>)[
    i18n.language
  ].label;
  const routeLabel = t(`routes.${routeName}`);
  const panelName = t(`panels.${subRouteName}`);

  return {
    root,
    routeName,
    subRouteType,
    subRouteName,
    localeLabel,
    routeLabel,
    panelName,
  };
};
