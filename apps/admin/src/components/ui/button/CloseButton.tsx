import { forwardRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CloseButtonProps } from './types';

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <IconButton ref={ref} {...rest}>
        <CloseIcon />
      </IconButton>
    );
  }
);

export default CloseButton;
