import { ReactNode } from 'react';
import {
  DialogProps as MuiDialogProps,
  DialogActionsProps,
  DialogTitleProps,
  DialogContentProps,
  DialogContentTextProps,
} from '@mui/material';

export interface DialogProps extends Omit<MuiDialogProps, 'title' | 'content'> {
  labelId?: string;
  actionsProps?: Partial<DialogActionsProps>;
  titleProps?: Partial<DialogTitleProps>;
  contentProps?: Partial<DialogContentProps>;
  contentTextProps?: Partial<DialogContentTextProps>;
  actions?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  text?: string;
  disableCloseButton?: boolean;
  disableBackdropClose?: boolean;
}
