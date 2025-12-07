export const routes = {
  base: {
    root: '/',
  },
  articles: {
    root: '/articles',
    detail: ':id',
  },
  categories: {
    root: '/categories',
    detail: ':id',
  },
  customFields: {
    root: '/custom-fields',
    detail: ':id',
  },
  files: {
    root: '/files',
    detail: ':id',
  },
  members: {
    root: '/members',
    detail: ':id',
  },
  menu: {
    root: '/menu',
    detail: ':id',
  },
  messages: {
    root: '/messages',
    detail: ':id',
  },
  pages: {
    root: '/pages',
    detail: ':id',
  },
  settings: {
    root: '/settings',
    panel: ':panel',
    panels: {
      global: 'global',
      client: 'client',
      locales: 'locales',
      blacklist: 'blacklist',
    },
  },
  tags: {
    root: '/tags',
    detail: ':id',
  },
  translations: {
    root: '/translations',
    detail: ':id',
  },
  users: {
    root: '/users',
    detail: ':id',
  },
  dashboard: {
    root: '/dashboard',
  },
  login: {
    root: '/login',
  },
  passwordRecovery: {
    root: '/password-recovery',
    token: ':token',
  },
  demo: {
    root: '/demo',
  },
};
