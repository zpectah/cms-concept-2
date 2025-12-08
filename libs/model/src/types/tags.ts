import { ItemBase } from './item';

export interface TagsItem extends ItemBase {
  name: string;
  type: string; // TODO
}

export type Tags = TagsItem[];

export type TagsDetail = TagsItem & {};
