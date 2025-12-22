import { contentModelKeys, modelKeys, systemModelKeys } from '../enums';
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

/** CMS Content only model names */
export type ContentModelNames = keyof typeof contentModelKeys;

/** CMS System only model names */
export type SystemModelNames = keyof typeof systemModelKeys;

/** CMS All model names */
export type ModelNames = keyof typeof modelKeys;

/** Basic union type of content item model */
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

/** Basic union type of system item model */
export type SystemModelItem =
  | BlacklistItem
  | CommentsItem
  | MembersItem
  | MessagesItem
  | RequestsItem
  | UsersItem;

/** Basic union type of mixed item model */
export type CommonModelItem = ContentModelItem | SystemModelItem;

/** Basic union type of content detail model */
export type ContentModelDetail =
  | ArticlesDetail
  | CategoriesDetail
  | CustomFieldsDetail
  | FilesDetail
  | PagesDetail
  | TagsDetail
  | TranslationsDetail;

/** Basic union type of system detail model */
export type SystemModelDetail =
  | BlacklistDetail
  | CommentsDetail
  | MenuDetail
  | MenuItemsDetail
  | MembersDetail
  | MessagesDetail
  | RequestsDetail
  | UsersDetail;

/** Basic union type of mixed detail model */
export type CommonModelDetail = ContentModelDetail | SystemModelDetail;

/* */

/** List item union type */
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
