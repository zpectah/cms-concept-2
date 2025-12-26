import { PhoneInput } from '../ui';
import { ControlledField } from '../field';
import { PhoneFieldProps } from './types';

const PhoneField = ({
  name,
  label,
  phoneInputProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: PhoneFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <PhoneInput
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          {...phoneInputProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default PhoneField;
