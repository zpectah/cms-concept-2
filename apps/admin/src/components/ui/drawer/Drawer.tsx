import { DrawerProps } from './types';
import DrawerBase from './DrawerBase';
import DrawerLayout from './DrawerLayout';

const Drawer = ({
  labelId = 'drawer',
  actions,
  title,
  titleSlot,
  titleActions = [],
  text,
  children,
  disableCloseButton,
  slotProps,
  width,
  ...rest
}: DrawerProps) => {
  const closeHandler = () => rest?.onClose?.({}, 'escapeKeyDown');

  if (!title && rest.open)
    console.warn('Title is need for proper display of component');

  return (
    <DrawerBase
      id={labelId}
      aria-labelledby={`${labelId}-title`}
      aria-describedby={`${labelId}-description`}
      slotProps={{
        paper: {
          sx: { width },
        },
        ...slotProps,
      }}
      onClose={closeHandler}
      {...rest}
    >
      <DrawerLayout
        labelId={labelId}
        actions={actions}
        title={title}
        titleSlot={titleSlot}
        titleActions={titleActions}
        text={text}
        disableCloseButton={disableCloseButton}
        onClose={closeHandler}
        children={children}
      />
    </DrawerBase>
  );
};

export default Drawer;
