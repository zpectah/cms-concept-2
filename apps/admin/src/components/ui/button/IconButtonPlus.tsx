import { forwardRef } from 'react';
import { Tooltip } from '../tooltip';
import { IconButtonPlusProps } from './types';
import IconButton from './IconButton';

const IconButtonPlus = forwardRef<HTMLButtonElement, IconButtonPlusProps>(
  (props, ref) => {
    const { tooltip, tooltipProps, disabledTooltip, disabled, ...rest } = props;

    return (
      <Tooltip
        content={tooltip}
        disabled={disabled || disabledTooltip}
        {...tooltipProps}
      >
        <IconButton ref={ref} disabled={disabled} {...rest} />
      </Tooltip>
    );
  }
);

export default IconButtonPlus;
