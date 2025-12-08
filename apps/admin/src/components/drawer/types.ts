import { ModelNames } from '@model';
import { DrawerComposedProps } from '../ui';

export interface DetailDrawerProps extends DrawerComposedProps {
  model: ModelNames;
  onClose?: () => void;
}
