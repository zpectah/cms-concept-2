import { toastsItemSeverityKeys } from '../enums';

export type ToastsItemSeverity = keyof typeof toastsItemSeverityKeys;

export interface ToastsItem {
  id: string;
  severity: ToastsItemSeverity;
  title: string;
  description?: string;
}

export interface NewToastsItem extends Omit<ToastsItem, 'id'> {
  autoclose?: number | boolean;
}

export type Toasts = ToastsItem[];
