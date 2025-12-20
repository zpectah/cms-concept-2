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

/** Model item props with all keys and all value types */
export type CommonModelItemProps = Partial<{
  [K in CommonModelItem as keyof K]: K[keyof K];
}>;

/** Partial content model item */
export type ContentPartialModelItem = Partial<
  ArticlesItem &
    CategoriesItem &
    CustomFieldsItem &
    FilesItem &
    MenuItem &
    MenuItemsItem &
    PagesItem &
    TagsItem &
    TranslationsItem
>;

/** Partial system model item */
export type SystemPartialModelItem = Partial<
  BlacklistItem &
    CommentsItem &
    MembersItem &
    MessagesItem &
    RequestsItem &
    UsersItem
>;

/** Partial mixed model item */
export type CommonPartialModelItem = Partial<
  ContentPartialModelItem & SystemPartialModelItem
>;

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

/** Model detail props with all keys and all value types */
export type CommonModelDetailProps = Partial<{
  [K in CommonModelDetail as keyof K]: K[keyof K];
}>;

/** Partial content model detail */
export type ContentPartialModelDetail = Partial<
  ArticlesDetail &
    CategoriesDetail &
    CustomFieldsDetail &
    FilesDetail &
    PagesDetail &
    TagsDetail &
    TranslationsDetail
>;

/** Partial system model detail */
export type SystemPartialModelDetail = Partial<
  BlacklistDetail &
    CommentsDetail &
    MenuDetail &
    MenuItemsDetail &
    MembersDetail &
    MessagesDetail &
    RequestsDetail &
    UsersDetail
>;

/** Partial mixed model detail */
export type CommonPartialModelDetail = Partial<
  ContentPartialModelDetail & SystemPartialModelDetail
>;
