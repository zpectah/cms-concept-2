import { forwardRef } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { IconButtonPlusProps } from './types';

const IconButtonPlus = forwardRef<HTMLButtonElement, IconButtonPlusProps>(
  (props, ref) => {
    const { tooltip, tooltipProps, ...rest } = props;

    const button = <IconButton ref={ref} {...rest} />;

    if (!tooltip) return button;

    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        {button}
      </Tooltip>
    );
  }
);

export default IconButtonPlus;
