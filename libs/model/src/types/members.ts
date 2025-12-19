import { EnumKeyValues } from '@common';
import { membersTypeKeys } from '../enums';
import { ItemBase } from './item';

export type MembersType = EnumKeyValues<typeof membersTypeKeys>;

export interface MembersItem extends ItemBase {
  type: MembersType;
}

export type Members = MembersItem[];

export type MembersDetail = MembersItem & {};
