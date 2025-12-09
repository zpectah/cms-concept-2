import { forwardRef } from 'react';
import { Button as UiButton } from '@chakra-ui/react';
import { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <UiButton ref={ref} {...props} />;
});

export default Button;
