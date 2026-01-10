import { ControlledField } from '../field';
import { LocationPickerFieldProps } from './types';
import LocationPicker from './LocationPicker';

const LocationPickerField = ({
  name,
  label,
  locationPickerProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: LocationPickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <LocationPicker
          id={id}
          isError={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isFullWidth={isFullWidth}
          placeholder={placeholder}
          {...locationPickerProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default LocationPickerField;
