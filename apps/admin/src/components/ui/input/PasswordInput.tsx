import { forwardRef, useState } from 'react';
import { IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { IconButtonPlus } from '../button';
import { PasswordInputProps } from './types';
import InputPlus from './InputPlus';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const { initialShow, disableToggle, ...rest } = props;

    const [open, setOpen] = useState<boolean>(initialShow ?? false);

    return (
      <InputPlus
        ref={ref}
        type={open ? 'text' : 'password'}
        startAdornment={<IconLock />}
        endAdornment={
          !disableToggle && (
            <IconButtonPlus onClick={() => setOpen(!open)}>
              {open ? <IconEye /> : <IconEyeOff />}
            </IconButtonPlus>
          )
        }
        {...rest}
      />
    );
  }
);

export default PasswordInput;
