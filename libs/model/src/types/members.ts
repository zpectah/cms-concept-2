import { Address, EnumKeyValues, PersonSex } from '@common';
import { membersTypeKeys } from '../enums';
import { ItemBase } from './item';

export type MembersType = EnumKeyValues<typeof membersTypeKeys>;

export interface MembersItem extends ItemBase {
  /** Unique ID for security/anonymous purpose, also used as avatar file name */
  uid: string;
  /** Member data type */
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
  /** Member avatar image for personal/redaction purpose */
  avatar_image?: string;
  /** Member avatar image hash */
  avatar_hash?: string;
}

export type Members = MembersItem[];

export type MembersDetail = MembersItem & {};
