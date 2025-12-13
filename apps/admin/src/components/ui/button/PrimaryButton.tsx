import { forwardRef } from 'react';
import { PrimaryButtonProps } from './types';
import Button from './Button';

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (props, ref) => {
    const { ...rest } = props;

    return <Button variant="contained" color="primary" {...rest} />;
  }
);

export default PrimaryButton;
