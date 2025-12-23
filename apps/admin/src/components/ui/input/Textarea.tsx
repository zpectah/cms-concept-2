import { forwardRef } from 'react';
import { TextareaProps } from './types';
import InputPlus from './InputPlus';

const Textarea = forwardRef<HTMLInputElement, TextareaProps>((props, ref) => {
  const { ...rest } = props;

  return (
    <InputPlus
      ref={ref}
      multiline
      type="text"
      inputMode="text"
      rows={5}
      {...rest}
    />
  );
});

export default Textarea;
