import { ReactNode } from 'react';
import {
  BoxProps,
  DrawerProps as MUiDrawerProps,
  AlertProps,
} from '@mui/material';
import { WithChildren } from '@common';
import { SxCommonValue } from '../../../types';
import { IconButtonPlusProps } from '../button';

export interface DrawerLayoutProps extends WithChildren {
  labelId?: string;
  actions?: ReactNode;
  title?: ReactNode;
  titleSlot?: ReactNode;
  titleActions?: IconButtonPlusProps[];
  text?: string;
  disableCloseButton?: boolean;
  onClose: () => void;
  wrapperProps?: Partial<BoxProps>;
  actionsMessages?: AlertProps[];
}

export interface DrawerBaseProps extends Omit<MUiDrawerProps, 'title'> {
  labelId?: string;
  width?: SxCommonValue;
  disableBackdropClose?: boolean;
}

export interface DrawerProps extends DrawerBaseProps {
  actions?: ReactNode;
  title?: ReactNode;
  titleSlot?: ReactNode;
  titleActions?: IconButtonPlusProps[];
  text?: string;
  disableCloseButton?: boolean;
}
