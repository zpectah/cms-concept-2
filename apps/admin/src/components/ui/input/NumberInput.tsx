import { forwardRef } from 'react';
import { NumberInputProps } from './types';
import InputPlus from './InputPlus';

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <InputPlus
        ref={ref}
        type="number"
        inputMode="numeric"
        slotProps={{
          input: {
            sx: {
              appearance: 'none',
            },
          },
        }}
        {...rest}
      />
    );
  }
);

export default NumberInput;
