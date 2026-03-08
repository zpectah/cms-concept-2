import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { FormProps } from './types';

const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { children, testId, ...rest } = props;

  return (
    <Box
      component="form"
      ref={ref}
      noValidate
      autoComplete="off"
      data-test-id={testId}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default Form;
