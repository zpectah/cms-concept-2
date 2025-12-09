import { forwardRef } from 'react';
import { Tooltip } from '../tooltip';
import { ButtonPlusProps } from './types';
import Button from './Button';

const ButtonPlus = forwardRef<HTMLButtonElement, ButtonPlusProps>(
  (props, ref) => {
    const { tooltip, tooltipProps, disabledTooltip, disabled, ...rest } = props;

    return (
      <Tooltip
        content={tooltip}
        disabled={disabled || disabledTooltip}
        {...tooltipProps}
      >
        <Button ref={ref} disabled={disabled} {...rest} />
      </Tooltip>
    );
  }
);

export default ButtonPlus;
