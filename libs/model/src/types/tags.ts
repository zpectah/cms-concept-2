import { EnumKeyValues } from '@common';
import { tagsTypeKeys } from '../enums';
import { ItemBase } from './item';

export type TagsType = EnumKeyValues<typeof tagsTypeKeys>;

export interface TagsItem extends ItemBase {
  name: string;
  type: TagsType;
}

export type Tags = TagsItem[];

export type TagsDetail = TagsItem & {};
