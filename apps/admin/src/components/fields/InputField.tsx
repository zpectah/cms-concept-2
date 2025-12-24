import { Input } from '../ui';
import { ControlledField } from '../field';
import { InputFieldProps } from './types';

const InputField = ({ name, label, inputProps, ...rest }: InputFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Input id={id} error={!!fieldState.error} {...inputProps} {...field} />
      )}
      {...rest}
    />
  );
};

export default InputField;
