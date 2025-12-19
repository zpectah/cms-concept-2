import { ReactNode } from 'react';
import { ContainerProps } from '@mui/material';
import { WithChildren } from '@common';
import { AppLayoutVariant, ViewLayoutVariant } from '../../types';
import { ModelNames } from '@model';

export interface AppLayoutProps {
  variant?: AppLayoutVariant;
  slots?: {
    toasts?: ReactNode;
    profile?: ReactNode;
    confirmDialog?: ReactNode;
    announcements?: ReactNode;
  };
}

export interface ViewLayoutProps extends WithChildren {
  variant?: ViewLayoutVariant;
  slot?: ReactNode;
  preloader?: ReactNode;
  disableSuspense?: boolean;
  containerWidth?: ContainerProps['maxWidth'];
  containerProps?: Partial<Omit<ContainerProps, 'maxWidth'>>;
  title?: ReactNode;
  titleSlot?: ReactNode;
  rootUrl: string | null;
  model?: ModelNames;
  navigationSlot?: ReactNode;
}

export interface HeaderProps {
  variant?: AppLayoutVariant;
}
