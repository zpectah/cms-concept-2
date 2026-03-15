import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { ButtonWithCheckboxProps } from './types';

const ButtonWithCheckbox = ({
  children,
  checkboxProps,
  ...rest
}: ButtonWithCheckboxProps) => {
  return (
    <Button sx={{ pr: 2 }} {...rest}>
      <Checkbox sx={{ margin: 0 }} {...checkboxProps} />
      {children}
    </Button>
  );
};

export default ButtonWithCheckbox;
