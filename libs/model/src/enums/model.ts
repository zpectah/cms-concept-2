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

export const entitiesModelKeys = {
  members: 'members',
  users: 'users',
} as const;

export const feedbackModelKeys = {
  comments: 'comments',
  messages: 'messages',
} as const;

export const systemModelKeys = {
  blacklist: 'blacklist',
  requests: 'requests',
} as const;

export const modelKeys = {
  ...contentModelKeys,
  ...entitiesModelKeys,
  ...feedbackModelKeys,
  ...systemModelKeys,
} as const;
