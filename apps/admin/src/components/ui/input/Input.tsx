import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { ...rest } = props;

  return <TextField ref={ref} {...rest} />;
});

export default Input;
