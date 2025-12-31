import { Address, EnumKeyValues, PersonSex } from '@common';
import { membersTypeKeys } from '../enums';
import { ItemBase } from './item';

export type MembersType = EnumKeyValues<typeof membersTypeKeys>;

export interface MembersItem extends ItemBase {
  type: MembersType;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  address?: Partial<Address>;
  flat_no?: string;
  sex?: PersonSex;
  birthdate?: string;
  description?: string;
}

export type Members = MembersItem[];

export type MembersDetail = MembersItem & {};
