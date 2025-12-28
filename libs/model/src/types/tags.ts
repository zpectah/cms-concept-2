import { EnumKeyValues } from '@common';
import { tagsColorKeys, tagsTypeKeys } from '../enums';
import { ItemBase } from './item';

export type TagsType = EnumKeyValues<typeof tagsTypeKeys>;
export type TagsColor = EnumKeyValues<typeof tagsColorKeys>;

export interface TagsItem extends ItemBase {
  name: string;
  type: TagsType;
  color: TagsColor;
}

export type Tags = TagsItem[];

export type TagsDetail = TagsItem & {};
