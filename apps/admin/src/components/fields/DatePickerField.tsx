import { DatePicker } from '../ui';
import { ControlledField } from '../field';
import { DatePickerFieldProps } from './types';

const DatePickerField = ({
  name,
  label,
  datePickerProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: DatePickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <DatePicker
          id={id}
          isError={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          {...datePickerProps}
          {...field}
          slotProps={{
            ...datePickerProps?.slotProps,
            textField: {
              fullWidth: isFullWidth,
              placeholder,
              ...datePickerProps?.slotProps?.textField,
            },
          }}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default DatePickerField;
