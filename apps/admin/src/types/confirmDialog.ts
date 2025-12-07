import { ReactNode } from 'react';
import { confirmDialogContextKeys } from '../enums';

export type ConfirmDialogContext = keyof typeof confirmDialogContextKeys;

export interface IConfirmDialog {
  title: string;
  content?: ReactNode;
  onConfirm: () => void;
  context?: ConfirmDialogContext;
  // Only as cancel callback
  onCancel?: () => void;
}
