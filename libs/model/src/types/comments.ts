import { EnumKeyValues } from '@common';
import { commentsTypeKeys } from '../enums';
import { RedactionModelNames } from './model';
import { ItemBase } from './item';

export type CommentsType = EnumKeyValues<typeof commentsTypeKeys>;

export interface CommentsItem extends ItemBase {
  type: CommentsType;
  sender: string;
  subject: string;
  content: string;
  parent_id: number;
  content_type: RedactionModelNames;
  content_id: number;
  reported: boolean;
}

export type Comments = CommentsItem[];

export type CommentsDetail = CommentsItem & {};

/** Just for recursive iteration */
export interface CommentsItemNode extends CommentsItem {
  children: CommentsItemNode[];
}
