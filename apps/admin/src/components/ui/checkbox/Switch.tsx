import { forwardRef } from 'react';
import { FormControlLabel, Switch as MuiSwitch } from '@mui/material';
import { SwitchProps } from './types';

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { name, label, inputProps, ...rest } = props;

  return (
    <FormControlLabel
      name={name}
      control={<MuiSwitch {...inputProps} />}
      label={label}
      inputRef={ref}
      {...rest}
    />
  );
});

export default Switch;
