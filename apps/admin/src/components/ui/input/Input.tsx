import { forwardRef } from 'react';
import { Input as UiInput } from '@chakra-ui/react';
import { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <UiInput ref={ref} {...props} />;
});

export default Input;
