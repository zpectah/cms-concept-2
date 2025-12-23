import { forwardRef } from 'react';
import { RadioProps } from './types';
import { Radio as MuiRadio, FormControlLabel } from '@mui/material';

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { name, label, inputProps, ...rest } = props;

  return (
    <FormControlLabel
      name={name}
      control={<MuiRadio {...inputProps} />}
      label={label}
      inputRef={ref}
      {...rest}
    />
  );
});

export default Radio;
