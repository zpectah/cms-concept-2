export const contentModelKeys = {
  articles: 'articles',
  categories: 'categories',
  customFields: 'customFields',
  files: 'files',
  menu: 'menu',
  menuItems: 'menuItems',
  pages: 'pages',
  tags: 'tags',
  translations: 'translations',
} as const;

export const systemModelKeys = {
  blacklist: 'blacklist',
  comments: 'comments',
  members: 'members',
  messages: 'messages',
  requests: 'requests',
  users: 'users',
} as const;

export const modelKeys = {
  ...contentModelKeys,
  ...systemModelKeys,
} as const;
