import {
  contentModelKeys,
  entitiesModelKeys,
  feedbackModelKeys,
  modelKeys,
  systemModelKeys,
} from '../enums';
import { ArticlesDetail, ArticlesItem } from './articles';
import { BlacklistDetail, BlacklistItem } from './blacklist';
import { CategoriesDetail, CategoriesItem } from './categories';
import { CommentsDetail, CommentsItem } from './comments';
import { CustomFieldsDetail, CustomFieldsItem } from './customFields';
import { FilesDetail, FilesItem } from './files';
import { MembersDetail, MembersItem } from './members';
import { MenuDetail, MenuItem } from './menu';
import { MenuItemsDetail, MenuItemsItem } from './menuItems';
import { MessagesDetail, MessagesItem } from './messages';
import { PagesDetail, PagesItem } from './pages';
import { RequestsDetail, RequestsItem } from './requests';
import { TagsDetail, TagsItem } from './tags';
import { TranslationsDetail, TranslationsItem } from './translations';
import { UsersDetail, UsersItem } from './users';
import { PropsFromItem, UnionToIntersection } from '@common';

/** Content type only model names */
export type ContentModelNames = keyof typeof contentModelKeys;

/** Entities type only model names */
export type EntitiesModelNames = keyof typeof entitiesModelKeys;

/** Feedback type only model names */
export type FeedbackModelNames = keyof typeof feedbackModelKeys;

/** System type only model names */
export type SystemModelNames = keyof typeof systemModelKeys;

/** All model names */
export type ModelNames = keyof typeof modelKeys;

/** Union type of content item model */
export type ContentModelItem =
  | ArticlesItem
  | CategoriesItem
  | CustomFieldsItem
  | FilesItem
  | MenuItem
  | MenuItemsItem
  | PagesItem
  | TagsItem
  | TranslationsItem;

/** Union type of entities item model */
export type EntitiesModelItem = MembersItem | UsersItem;

/** Union type of feedback item model */
export type FeedbackModelItem = CommentsItem | MessagesItem;

/** Union type of system item model */
export type SystemModelItem = BlacklistItem | RequestsItem;

/** Union type of mixed item model */
export type UnionModelItem =
  | ContentModelItem
  | EntitiesModelItem
  | FeedbackModelItem
  | SystemModelItem;

/** Union type of content detail model */
export type ContentModelDetail =
  | ArticlesDetail
  | CategoriesDetail
  | CustomFieldsDetail
  | FilesDetail
  | MenuDetail
  | MenuItemsDetail
  | PagesDetail
  | TagsDetail
  | TranslationsDetail;

/** Union type of entities detail model */
export type EntitiesModelDetail = MembersDetail | UsersDetail;

/** Union type of feedback detail model */
export type FeedbackModelDetail = CommentsDetail | MessagesDetail;

/** Union type of system detail model */
export type SystemModelDetail = BlacklistDetail | RequestsDetail;

/** Union type of mixed detail model */
export type UnionModelDetail =
  | ContentModelDetail
  | EntitiesModelDetail
  | FeedbackModelDetail
  | SystemModelDetail;

/* */

/** List item partial union type */
export type ListModelItem = Partial<
  | ArticlesItem
  | CategoriesItem
  | CustomFieldsItem
  | FilesItem
  | MenuItem
  | MenuItemsItem
  | PagesItem
  | TagsItem
  | TranslationsItem
  | MembersItem
  | MessagesItem
  | UsersItem
>;

/** Model item props with all keys and all value types */
export type ListModelItemProps = UnionToIntersection<
  ListModelItem extends infer U
    ? U extends unknown
      ? PropsFromItem<U>
      : never
    : never
>;
