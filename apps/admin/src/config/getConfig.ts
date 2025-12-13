/* eslint-disable @nx/enforce-module-boundaries */

import packages from '../../../../package.json';
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
    version: packages.version,
    api: {
      /** Api root url */
      url: apiUrl,
      /** Api consumer token */
      token: apiToken,
    },
    uploads: {
      /** Path for uploading files */
      target: uploadsTarget,
      /** Path for getting files */
      source: uploadsSources,
    },
    // Helpers
    multiLocale: cms.admin.locale.active.length > 1,
  };
};

export default getConfig;
