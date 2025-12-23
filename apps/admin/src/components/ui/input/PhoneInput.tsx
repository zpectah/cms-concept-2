import { forwardRef } from 'react';
import { IconPhone } from '@tabler/icons-react';
import { PhoneInputProps } from './types';
import InputPlus from './InputPlus';

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <InputPlus
        ref={ref}
        type="tel"
        inputMode="tel"
        startAdornment={<IconPhone />}
        {...rest}
      />
    );
  }
);

export default PhoneInput;
