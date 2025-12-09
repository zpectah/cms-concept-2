import { forwardRef } from 'react';
import { IconButton as UiIconButton } from '@chakra-ui/react';
import { IconButtonProps } from './types';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return <UiIconButton ref={ref} {...props} />;
  }
);

export default IconButton;
