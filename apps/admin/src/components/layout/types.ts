import { ReactNode } from 'react';
import { ContainerProps } from '@chakra-ui/react';
import { WithChildren } from '@common';
import { AppLayoutVariant, ViewLayoutVariant } from '../../types';

export interface AppLayoutProps {
  variant?: AppLayoutVariant;
  slots?: {
    toasts?: ReactNode;
    profile?: ReactNode;
    confirmDialog?: ReactNode;
  };
}

export interface ViewLayoutProps extends WithChildren {
  containerProps?: Partial<ContainerProps>;
  disableSuspense?: boolean;
  disableTitle?: boolean;
  preloader?: ReactNode;
  slot?: ReactNode;
  titleSlot?: ReactNode;
  variant?: ViewLayoutVariant;
}

export type FooterProps = Partial<WithChildren>;

export interface LogoProps {
  disableLink?: boolean;
}
