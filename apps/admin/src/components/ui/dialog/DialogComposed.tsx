import { ReactNode } from 'react';
import {
  Dialog,
  Button,
  CloseButton,
  ButtonProps,
  DialogRootProps,
} from '@chakra-ui/react';
import { WithChildren } from '@common';

interface DialogActionProps extends ButtonProps {
  id: string;
  label: ReactNode;
}

interface DialogComposedProps extends WithChildren {
  actions?: DialogActionProps[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  rootProps?: Partial<DialogRootProps>;
  title?: ReactNode;
}

const DialogComposed = ({
  children,
  actions = [],
  open,
  onOpenChange,
  rootProps,
  title,
}: DialogComposedProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open }) => onOpenChange?.(open)}
      {...rootProps}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton />
          </Dialog.CloseTrigger>
          {title && (
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
          )}
          <Dialog.Body>{children}</Dialog.Body>
          {actions?.length > 0 && (
            <Dialog.Footer>
              {actions?.map(({ id, label, ...button }) => (
                <Button key={id} {...button}>
                  {label}
                </Button>
              ))}
            </Dialog.Footer>
          )}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default DialogComposed;
