import { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { InputPlusProps } from './types';

const InputPlus = forwardRef<HTMLInputElement, InputPlusProps>((props, ref) => {
  const { startAdornment, endAdornment, slotProps, ...rest } = props;

  return (
    <TextField
      ref={ref}
      slotProps={{
        input: {
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        },
        ...slotProps,
      }}
      {...rest}
    />
  );
});

export default InputPlus;
