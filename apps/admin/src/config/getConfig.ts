/* eslint-disable @nx/enforce-module-boundaries */

import cms from '../../../../config.cms.json';
import locales from '../../../../config.locales.json';
import { routes } from './routes';

const getConfig = () => {
  const env = import.meta.env.MODE ?? 'undefined';

  const apiUrl = import.meta.env.VITE_API_URL ?? '/';
  const apiToken = import.meta.env.VITE_API_TOKEN ?? '';

  const uploadsTarget = import.meta.env.VITE_UPLOADS_TARGET ?? '/';
  const uploadsSources = import.meta.env.VITE_UPLOADS_SOURCE ?? '/';

  return {
    cms,
    locales,
    routes,
    environment: env,
    api: {
      url: apiUrl,
      token: apiToken,
    },
    uploads: {
      target: uploadsTarget,
      source: uploadsSources,
    },
    // Helpers
    multiLocale: cms.admin.locale.active.length > 1,
  };
};

export default getConfig;
