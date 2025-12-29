import { ControlledField } from '../../../../components';
import { CategoriesPickerFieldProps } from './types';
import CategoriesPicker from './CategoriesPicker';

const CategoriesPickerField = ({
  name,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  categoriesPickerProps,
  isMultiple,
  ...rest
}: CategoriesPickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <CategoriesPicker
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          multiple={isMultiple}
          {...categoriesPickerProps}
          {...field}
        />
      )}
      {...rest}
    />
  );
};

export default CategoriesPickerField;
