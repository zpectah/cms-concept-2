import { EnumKeyValues } from '@common';
import { customFieldsTypeKeys } from '../enums';
import { ItemBase } from './item';

export type CustomFieldsType = EnumKeyValues<typeof customFieldsTypeKeys>;

export interface CustomFieldsItem extends ItemBase {
  name: string;
  type: CustomFieldsType;
}

export type CustomFields = CustomFieldsItem[];

export type CustomFieldsDetail = CustomFieldsItem & {};
