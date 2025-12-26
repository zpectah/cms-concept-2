import { forwardRef } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { CheckboxProps } from './types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { id, name, label, inputProps, ...rest } = props;

  return (
    <FormControlLabel
      name={name}
      control={<MuiCheckbox id={id} {...inputProps} />}
      label={label}
      inputRef={ref}
      {...rest}
    />
  );
});

export default Checkbox;
