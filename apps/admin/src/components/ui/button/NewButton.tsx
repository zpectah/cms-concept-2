import { forwardRef } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { NewButtonProps } from './types';
import Button from './Button';

const NewButton = forwardRef<HTMLButtonElement, NewButtonProps>(
  (props, ref) => {
    const { size = 'medium', ...rest } = props;

    const iconSizes = {
      small: '.75rem',
      medium: '1rem',
      large: '1.25rem',
    };
    const iconSize = iconSizes[size];

    return (
      <Button
        ref={ref}
        variant="contained"
        color="success"
        startIcon={<IconPlus size={iconSize} />}
        size={size}
        {...rest}
      />
    );
  }
);

export default NewButton;
