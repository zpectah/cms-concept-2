import { NumberInput } from '../ui';
import { ControlledField } from '../field';
import { NumberFieldProps } from './types';

const NumberField = ({
  name,
  label,
  numberInputProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: NumberFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <NumberInput
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          {...numberInputProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default NumberField;
