import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isReadOnly, ...rest } = props;

  return (
    <TextField
      ref={ref}
      {...rest}
      slotProps={{
        input: { readOnly: isReadOnly, ...rest?.slotProps?.input },
        ...rest?.slotProps,
      }}
    />
  );
});

export default Input;
