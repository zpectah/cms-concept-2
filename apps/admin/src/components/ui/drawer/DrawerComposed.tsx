import { Drawer, Button, CloseButton } from '@chakra-ui/react';
import { DrawerComposedProps } from './types';

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
