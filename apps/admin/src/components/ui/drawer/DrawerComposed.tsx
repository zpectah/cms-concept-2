import { ReactNode } from 'react';
import {
  Drawer,
  Button,
  CloseButton,
  ButtonProps,
  DrawerRootProps,
} from '@chakra-ui/react';
import { WithChildren } from '@common';

interface DrawerActionProps extends ButtonProps {
  id: string;
  label: ReactNode;
}

interface DrawerComposedProps extends WithChildren {
  actions?: DrawerActionProps[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  rootProps?: Partial<DrawerRootProps>;
  title?: ReactNode;
}

const DrawerComposed = ({
  children,
  actions = [],
  open,
  onOpenChange,
  rootProps,
  title,
}: DrawerComposedProps) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={({ open }) => onOpenChange?.(open)}
      {...rootProps}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
          {title && (
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
          )}
          <Drawer.Body>{children}</Drawer.Body>
          {actions?.length > 0 && (
            <Drawer.Footer>
              {actions?.map(({ id, label, ...button }) => (
                <Button key={id} {...button}>
                  {label}
                </Button>
              ))}
            </Drawer.Footer>
          )}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default DrawerComposed;
