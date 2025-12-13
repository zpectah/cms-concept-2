import { forwardRef } from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { ...rest } = props;

  return <MuiButton ref={ref} {...rest} />;
});

export default Button;
