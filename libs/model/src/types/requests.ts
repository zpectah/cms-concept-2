import { EnumKeyValues } from '@common';
import { requestsTypeKeys } from '../enums';

export type RequestsType = EnumKeyValues<typeof requestsTypeKeys>;

export interface RequestsItem {
  type: RequestsType;
}

export type Requests = RequestsItem[];

export type RequestsDetail = RequestsItem & {};
