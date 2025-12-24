import { EmailInput } from '../ui';
import { ControlledField } from '../field';
import { EmailFieldProps } from './types';

const EmailField = ({ name, label, inputProps, ...rest }: EmailFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <EmailInput
          id={id}
          error={!!fieldState.error}
          {...inputProps}
          {...field}
        />
      )}
      {...rest}
    />
  );
};

export default EmailField;
