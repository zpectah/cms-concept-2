import { Input } from '../ui';
import { ControlledField } from '../field';
import { InputFieldProps } from './types';

const InputField = ({ name, label, inputProps, ...rest }: InputFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field) => <Input id={id} {...inputProps} {...field} />}
      {...rest}
    />
  );
};

export default InputField;
