import {
  contentModelKeys,
  entitiesModelKeys,
  feedbackModelKeys,
  modelKeys,
  organizationModelKeys,
  redactionModelKeys,
  systemModelKeys,
} from '../enums';
import { articlesTypeKeysArray } from './articles';
import { blacklistTypeKeysArray } from './blacklist';
import { categoriesTypeKeysArray } from './categories';
import { commentsTypeKeysArray } from './comments';
import { customFieldsTypeKeysArray } from './customFields';
import { filesTypeKeysArray } from './files';
import { membersTypeKeysArray } from './members';
import { menuItemsTypeKeysArray } from './menuItems';
import { menuTypeKeysArray } from './menu';
import { messagesTypeKeysArray } from './messages';
import { pagesTypeKeysArray } from './pages';
import { requestsTypeKeysArray } from './requests';
import { tagsTypeKeysArray } from './tags';
import { translationsTypeKeysArray } from './translations';
import { usersTypeKeysArray } from './users';

export const redactionModelKeysArray = [...Object.keys(redactionModelKeys)] as [
  string,
  ...string[]
];

export const organizationModelKeysArray = [
  ...Object.keys(organizationModelKeys),
] as [string, ...string[]];

export const contentModelKeysArray = [...Object.keys(contentModelKeys)] as [
  string,
  ...string[]
];

export const entitiesModelKeysArray = [...Object.keys(entitiesModelKeys)] as [
  string,
  ...string[]
];

export const feedbackModelKeysArray = [...Object.keys(feedbackModelKeys)] as [
  string,
  ...string[]
];

export const systemModelKeysArray = [...Object.keys(systemModelKeys)] as [
  string,
  ...string[]
];

export const modelKeysArray = [...Object.keys(modelKeys)] as [
  string,
  ...string[]
];

export const modelGroups = {
  redaction: redactionModelKeysArray,
  organization: organizationModelKeysArray,
  feedback: feedbackModelKeysArray,
  entities: entitiesModelKeysArray,
  system: systemModelKeysArray,
};

export const modelTypes = {
  articles: articlesTypeKeysArray,
  blacklist: blacklistTypeKeysArray,
  categories: categoriesTypeKeysArray,
  comments: commentsTypeKeysArray,
  customFields: customFieldsTypeKeysArray,
  files: filesTypeKeysArray,
  members: membersTypeKeysArray,
  menu: menuTypeKeysArray,
  menuItems: menuItemsTypeKeysArray,
  messages: messagesTypeKeysArray,
  pages: pagesTypeKeysArray,
  requests: requestsTypeKeysArray,
  tags: tagsTypeKeysArray,
  translations: translationsTypeKeysArray,
  users: usersTypeKeysArray,
};
