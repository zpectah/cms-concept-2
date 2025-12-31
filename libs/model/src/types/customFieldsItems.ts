import { EnumKeyValues } from '@common';
import { customFieldsItemsTypeKeys } from '../enums';
import { ItemBase } from './item';

export type CustomFieldsItemsType = EnumKeyValues<
  typeof customFieldsItemsTypeKeys
>;

export interface CustomFieldsItemsItem extends ItemBase {
  name: string;
  type: CustomFieldsItemsType;
}

export type CustomFieldsItems = CustomFieldsItemsItem[];

export type CustomFieldsItemsDetail = CustomFieldsItemsItem & {};
