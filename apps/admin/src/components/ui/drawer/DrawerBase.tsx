import { Drawer as MUiDrawer } from '@mui/material';
import { DrawerBaseProps } from './types';

const DrawerBase = ({
  labelId = 'drawer-base',
  children,
  slotProps,
  width,
  disableBackdropClose,
  onClose,
  ...rest
}: DrawerBaseProps) => {
  return (
    <MUiDrawer
      id={labelId}
      aria-labelledby={`${labelId}-title`}
      aria-describedby={`${labelId}-description`}
      slotProps={{
        paper: {
          sx: { width },
        },
        ...slotProps,
      }}
      onClose={(event, reason) => {
        if (disableBackdropClose && reason === 'backdropClick') return;

        onClose?.(event, reason);
      }}
      {...rest}
    >
      {children}
    </MUiDrawer>
  );
};

export default DrawerBase;
