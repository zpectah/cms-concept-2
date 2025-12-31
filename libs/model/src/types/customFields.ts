import { EnumKeyValues } from '@common';
import { customFieldsTypeKeys } from '../enums';
import { ItemBase, ItemLocaleBase } from './item';

export type CustomFieldsType = EnumKeyValues<typeof customFieldsTypeKeys>;

export interface CustomFieldsItem extends ItemBase {
  name: string;
  type: CustomFieldsType;
}

export type CustomFields = CustomFieldsItem[];

export interface CustomFieldsDetailLocale {
  title: string;
  description?: string;
  content?: string;
}

export interface CustomFieldsDetail
  extends CustomFieldsItem,
    ItemLocaleBase<CustomFieldsDetailLocale> {}
