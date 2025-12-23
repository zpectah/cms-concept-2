import { forwardRef } from 'react';
import { IconMail } from '@tabler/icons-react';
import { EmailInputProps } from './types';
import InputPlus from './InputPlus';

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <InputPlus
        ref={ref}
        type="email"
        inputMode="email"
        startAdornment={<IconMail />}
        {...rest}
      />
    );
  }
);

export default EmailInput;
