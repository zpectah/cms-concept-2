import { EnumKeyValues } from '@common';
import { blacklistTypeKeys } from '../enums';
import { ItemBase } from './item';

export type BlacklistType = EnumKeyValues<typeof blacklistTypeKeys>;

export interface BlacklistItem extends Omit<ItemBase, 'updated'> {
  type: BlacklistType;
  email?: string;
  ipaddress?: string;
}

export type Blacklist = BlacklistItem[];

export type BlacklistDetail = BlacklistItem & {};
