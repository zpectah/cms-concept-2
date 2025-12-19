import { EnumKeyValues } from '@common';
import { messagesTypeKeys } from '../enums';
import { ItemBase } from './item';

export type MessagesType = EnumKeyValues<typeof messagesTypeKeys>;

export interface MessagesItem extends ItemBase {
  type: MessagesType;
}

export type Messages = MessagesItem[];

export type MessagesDetail = MessagesItem & {};
