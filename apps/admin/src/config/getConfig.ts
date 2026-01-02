/* eslint-disable @nx/enforce-module-boundaries */

import packages from '../../../../package.json';
import cms from '../../../../config.cms.json';
import locales from '../../../../config.locales.json';
import { routes } from './routes';
import { endpoints } from './api';

const getConfig = () => {
  const env = import.meta.env.MODE ?? 'undefined';

  const apiUrl = import.meta.env.VITE_API_URL ?? '/';
  const apiToken = import.meta.env.VITE_API_TOKEN ?? '';

  const uploadsTarget = import.meta.env.VITE_UPLOADS_TARGET ?? '/';
  const uploadsSources = import.meta.env.VITE_UPLOADS_SOURCE ?? '/';

  const apiEndpoints = {
    articles: `${apiUrl}${endpoints.articles}`,
    categories: `${apiUrl}${endpoints.categories}`,
    comments: `${apiUrl}${endpoints.comments}`,
    customFields: `${apiUrl}${endpoints.customFields}`,
    files: `${apiUrl}${endpoints.files}`,
    members: `${apiUrl}${endpoints.members}`,
    menu: `${apiUrl}${endpoints.menu}`,
    menuItems: `${apiUrl}${endpoints.menuItems}`, // TODO ?
    messages: `${apiUrl}${endpoints.messages}`,
    pages: `${apiUrl}${endpoints.pages}`,
    settings: `${apiUrl}${endpoints.settings}`,
    tags: `${apiUrl}${endpoints.tags}`,
    translations: `${apiUrl}${endpoints.translations}`,
    users: `${apiUrl}${endpoints.users}`,
    blacklist: `${apiUrl}${endpoints.blacklist}`,
    requests: `${apiUrl}${endpoints.requests}`,
  };

  return {
    cms,
    locales,
    routes,
    environment: env,
    version: packages.version,
    debug: env === 'development',
    api: {
      /** Api root url */
      url: apiUrl,
      /** Api consumer token */
      token: apiToken,
      /** Api endpoints */
      endpoints: apiEndpoints,
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
