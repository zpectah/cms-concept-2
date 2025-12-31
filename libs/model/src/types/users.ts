import { EnumKeyValues } from '@common';
import { usersAccessKeys, usersTypeKeys } from '../enums';
import { ItemBase } from './item';

export type UsersType = EnumKeyValues<typeof usersTypeKeys>;
export type UsersAccessRights = EnumKeyValues<typeof usersAccessKeys>;

export interface UsersItem extends ItemBase {
  type: UsersType;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  access_rights: UsersAccessRights;
  avatar_image?: string;
  avatar_hash?: string;
}

export type Users = UsersItem[];

export type UsersDetail = UsersItem & {};
