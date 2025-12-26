import { NumberAlt2Input } from '../ui';
import { ControlledField } from '../field';
import { NumberAlt2FieldProps } from './types';

const NumberAlt2Field = ({
  name,
  label,
  numberInputAltProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: NumberAlt2FieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <NumberAlt2Input
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

export default NumberAlt2Field;
