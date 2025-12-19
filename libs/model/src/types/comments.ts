import { EnumKeyValues } from '@common';
import { commentsTypeKeys } from '../enums';
import { ItemBase } from './item';

export type CommentsType = EnumKeyValues<typeof commentsTypeKeys>;

export interface CommentsItem extends ItemBase {
  type: CommentsType;
}

export type Comments = CommentsItem[];

export type CommentsDetail = CommentsItem & {};
