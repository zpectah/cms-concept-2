import { forwardRef } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
} from '@mui/material';
import { RadioGroupProps } from './types';
import Radio from './Radio';

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (props, ref) => {
    const { items = [], name, label, controlProps, ...rest } = props;

    return (
      <FormControl ref={ref} {...controlProps}>
        {label && <FormLabel>{label}</FormLabel>}
        <MuiRadioGroup name={name} {...rest}>
          {items.map((item, index) => (
            <Radio key={index} {...item} />
          ))}
        </MuiRadioGroup>
      </FormControl>
    );
  }
);

export default RadioGroup;
