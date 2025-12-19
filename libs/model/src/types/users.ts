import { EnumKeyValues } from '@common';
import { usersTypeKeys } from '../enums';
import { ItemBase } from './item';

export type UsersType = EnumKeyValues<typeof usersTypeKeys>;

export interface UsersItem extends ItemBase {
  type: UsersType;
}

export type Users = UsersItem[];

export type UsersDetail = UsersItem & {};
