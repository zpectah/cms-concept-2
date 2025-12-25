import { Select } from '../ui';
import { ControlledField } from '../field';
import { SelectFieldProps } from './types';

const SelectField = ({
  name,
  label,
  options = [],
  selectProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: SelectFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Select
          id={id}
          error={!!fieldState.error}
          options={options}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          {...selectProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      ignoreId
      {...rest}
    />
  );
};

export default SelectField;
