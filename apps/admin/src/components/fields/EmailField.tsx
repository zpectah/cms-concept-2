import { EmailInput } from '../ui';
import { ControlledField } from '../field';
import { EmailFieldProps } from './types';

const EmailField = ({ name, label, inputProps, ...rest }: EmailFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field) => <EmailInput id={id} {...inputProps} {...field} />}
      {...rest}
    />
  );
};

export default EmailField;
