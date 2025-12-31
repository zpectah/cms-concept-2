export const redactionModelKeys = {
  articles: 'articles',
  files: 'files',
  tags: 'tags',
} as const;

export const organizationModelKeys = {
  categories: 'categories',
  customFields: 'customFields',
  customFieldsItems: 'customFieldsItems',
  menu: 'menu',
  menuItems: 'menuItems',
  pages: 'pages',
  translations: 'translations',
} as const;

export const contentModelKeys = {
  ...redactionModelKeys,
  ...organizationModelKeys,
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
  settings: 'settings',
} as const;

export const modelKeys = {
  ...contentModelKeys,
  ...entitiesModelKeys,
  ...feedbackModelKeys,
  ...systemModelKeys,
} as const;
