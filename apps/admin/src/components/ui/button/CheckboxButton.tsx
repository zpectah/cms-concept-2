import { forwardRef } from 'react';
import { IconSquareCheck, IconSquareDashed } from '@tabler/icons-react';
import IconButtonPlus from './IconButtonPlus';
import { CheckboxButtonProps } from './types';

const CheckboxButton = forwardRef<HTMLButtonElement, CheckboxButtonProps>(
  (props, ref) => {
    const { isSelected, iconSize = '1.25rem', ...rest } = props;

    return (
      <IconButtonPlus ref={ref} {...rest}>
        {isSelected ? (
          <IconSquareCheck size={iconSize} />
        ) : (
          <IconSquareDashed size={iconSize} />
        )}
      </IconButtonPlus>
    );
  }
);

export default CheckboxButton;
