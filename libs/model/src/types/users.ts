import { EnumKeyValues } from '@common';
import { usersAccessKeys, usersTypeKeys } from '../enums';
import { ItemBase } from './item';

export type UsersType = EnumKeyValues<typeof usersTypeKeys>;
export type UsersAccessRights = EnumKeyValues<typeof usersAccessKeys>;

export interface UsersItem extends ItemBase {
  /** Unique ID for security/anonymous purpose, also used as avatar file name */
  uid: string;
  /** User data type */
  type: UsersType;
  /** User unique email address */
  email: string;
  /** Users secret password */
  password?: string;
  /** User first name */
  first_name?: string;
  /** User surname */
  last_name?: string;
  /** User security access rights */
  access_rights: UsersAccessRights;
  /** User avatar image for personal/redaction purpose */
  avatar_image?: string;
  /** User avatar image hash */
  avatar_hash?: string;
}

export type Users = UsersItem[];

export type UsersDetail = UsersItem & {};
