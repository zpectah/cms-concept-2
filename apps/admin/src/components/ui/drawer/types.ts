import { ButtonProps, DrawerRootProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { WithChildren } from '@common';

interface DrawerActionProps extends ButtonProps {
  id: string;
  label: ReactNode;
}

export interface DrawerComposedProps extends WithChildren {
  actions?: DrawerActionProps[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  rootProps?: Partial<DrawerRootProps>;
  title?: ReactNode;
}
