import { forwardRef } from 'react';
import { Button as UiButton } from '@chakra-ui/react';
import { ButtonBaseProps } from './types';

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ ...rest }, ref) => {
    return <UiButton ref={ref} {...rest} />;
  }
);

export default ButtonBase;
