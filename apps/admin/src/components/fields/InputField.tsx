import { Input } from '../ui';
import { ControlledField } from '../field';
import { InputFieldProps } from './types';

const InputField = ({
  name,
  label,
  inputProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: InputFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Input
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          {...inputProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default InputField;
