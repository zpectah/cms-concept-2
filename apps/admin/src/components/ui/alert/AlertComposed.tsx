import { Alert, CloseButton, AlertRootProps } from '@chakra-ui/react';
import { ToastsItemSeverity } from '../../../types';

interface AlertComposedProps {
  title: string;
  description?: string;
  severity?: ToastsItemSeverity;
  rootProps?: Partial<AlertRootProps>;
  onClose?: () => void;
}

const AlertComposed = ({
  title,
  description,
  severity,
  rootProps,
  onClose,
}: AlertComposedProps) => {
  return (
    <Alert.Root status={severity} {...rootProps}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{description}</Alert.Description>
      </Alert.Content>
      {onClose && (
        <CloseButton
          pos="relative"
          top="-2"
          insetEnd="-2"
          onClick={onClose}
          size="sm"
        />
      )}
    </Alert.Root>
  );
};

export default AlertComposed;
