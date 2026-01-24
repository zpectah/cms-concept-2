import { ControlledField } from '../../../../components';
import { PagesPickerFieldProps } from './types';
import PagesPicker from './PagesPicker';

const PagesPickerField = ({
  name,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  pagesPickerProps,
  isMultiple,
  ...rest
}: PagesPickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      isRequired={isRequired}
      render={(id, field, fieldState) => (
        <PagesPicker
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          multiple={isMultiple}
          {...pagesPickerProps}
          {...field}
        />
      )}
      {...rest}
    />
  );
};

export default PagesPickerField;
