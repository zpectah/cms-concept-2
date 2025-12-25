import { NumberAltInput } from '../ui';
import { ControlledField } from '../field';
import { NumberAltFieldProps } from './types';

const NumberAltField = ({
  name,
  label,
  numberInputAltProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: NumberAltFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <NumberAltInput
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          {...numberInputAltProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default NumberAltField;
