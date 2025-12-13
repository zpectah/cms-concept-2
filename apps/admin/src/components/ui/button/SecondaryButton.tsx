import { forwardRef } from 'react';
import { SecondaryButtonProps } from './types';
import Button from './Button';

const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  (props, ref) => {
    const { ...rest } = props;

    return <Button variant="outlined" color="primary" {...rest} />;
  }
);

export default SecondaryButton;
