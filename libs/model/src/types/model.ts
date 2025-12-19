import { modelKeys } from '../enums';
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

export type ModelNames = keyof typeof modelKeys;

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

export type SystemModelItem =
  | BlacklistItem
  | CommentsItem
  | MembersItem
  | MessagesItem
  | RequestsItem
  | UsersItem;

export type CommonModelItem = ContentModelItem | SystemModelItem;

export type ContentModelDetail =
  | ArticlesDetail
  | CategoriesDetail
  | CustomFieldsDetail
  | FilesDetail
  | PagesDetail
  | TagsDetail
  | TranslationsDetail;

export type SystemModelDetail =
  | BlacklistDetail
  | CommentsDetail
  | MenuDetail
  | MenuItemsDetail
  | MembersDetail
  | MessagesDetail
  | RequestsDetail
  | UsersDetail;

export type CommonModelDetail = ContentModelDetail | SystemModelDetail;
