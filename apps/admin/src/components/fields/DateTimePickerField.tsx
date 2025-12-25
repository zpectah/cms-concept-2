import { DateTimePicker } from '../ui';
import { ControlledField } from '../field';
import { DateTimePickerFieldProps } from './types';

const DateTimePickerField = ({
  name,
  label,
  dateTimePickerProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: DateTimePickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <DateTimePicker
          id={id}
          isError={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          {...dateTimePickerProps}
          {...field}
          slotProps={{
            ...dateTimePickerProps?.slotProps,
            textField: {
              fullWidth: isFullWidth,
              placeholder,
              ...dateTimePickerProps?.slotProps?.textField,
            },
          }}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default DateTimePickerField;
