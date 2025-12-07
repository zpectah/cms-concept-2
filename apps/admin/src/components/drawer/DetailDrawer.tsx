import { Drawer } from '../ui';
import { DetailDrawerProps } from './types';

const DetailDrawer = ({
  children,
  model,
  onClose,
  ...rest
}: DetailDrawerProps) => {
  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
      rootProps={{
        unmountOnExit: true,
        size: 'xl', // TODO: udelat toggle a přepínat tuto hodnotu na full a zpět
      }}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default DetailDrawer;
