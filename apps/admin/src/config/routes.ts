const detailIdSuffix = 'id/:id';

export const routes = {
  base: {
    root: '/',
  },
  articles: {
    root: '/articles',
    detail: detailIdSuffix,
  },
  categories: {
    root: '/categories',
    detail: detailIdSuffix,
  },
  customFields: {
    root: '/custom-fields',
    detail: detailIdSuffix,
  },
  files: {
    root: '/files',
    detail: detailIdSuffix,
  },
  members: {
    root: '/members',
    detail: detailIdSuffix,
  },
  menu: {
    root: '/menu',
    detail: detailIdSuffix,
  },
  messages: {
    root: '/messages',
    detail: detailIdSuffix,
  },
  pages: {
    root: '/pages',
    detail: detailIdSuffix,
  },
  settings: {
    root: '/settings',
    panels: {
      global: 'global',
      client: 'client',
      languages: 'languages',
      blacklist: 'blacklist',
    },
  },
  tags: {
    root: '/tags',
    detail: detailIdSuffix,
  },
  translations: {
    root: '/translations',
    detail: detailIdSuffix,
  },
  users: {
    root: '/users',
    detail: detailIdSuffix,
  },
  dashboard: {
    root: '/dashboard',
  },
  login: {
    root: '/login',
  },
  passwordRecovery: {
    root: '/password-recovery',
    token: 'token/:token',
  },
  demo: {
    root: '/demo',
  },
};
