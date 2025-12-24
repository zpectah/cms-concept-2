import { Select } from '../ui';
import { ControlledField } from '../field';
import { SelectFieldProps } from './types';

const SelectField = ({
  name,
  label,
  options = [],
  selectProps,
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
          {...selectProps}
          {...field}
        />
      )}
      ignoreId
      {...rest}
    />
  );
};

export default SelectField;
