import { ControlledField } from '../../../../components';
import { TagsPickerFieldProps } from './types';
import TagsPicker from './TagsPicker';

const TagsPickerField = ({
  name,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  tagsPickerProps,
  isMultiple,
  ...rest
}: TagsPickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <TagsPicker
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          multiple={isMultiple}
          {...tagsPickerProps}
          {...field}
        />
      )}
      {...rest}
    />
  );
};

export default TagsPickerField;
