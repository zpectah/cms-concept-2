import { confirmDialogContextKeys } from '../enums';

export type ConfirmDialogContext = keyof typeof confirmDialogContextKeys;

export interface IConfirmDialog {
  title: string;
  content?: string;
  onConfirm: () => void;
  context?: ConfirmDialogContext;
  onCancel?: () => void;
}
