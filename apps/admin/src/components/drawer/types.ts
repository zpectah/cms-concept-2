import { Model } from '@model';
import { DrawerComposedProps } from '../ui';

export interface DetailDrawerProps extends DrawerComposedProps {
  model: Model;
  onClose?: () => void;
}
