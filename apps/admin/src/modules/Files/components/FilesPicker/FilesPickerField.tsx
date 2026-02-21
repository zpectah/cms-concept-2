import { ControlledField } from '../../../../components';
import FilesPicker from './FilesPicker';
import { FilesPickerFieldProps } from './types';

const FilesPickerField = ({
  name,
  label,
  isRequired,
  isDisabled,
  placeholder,
  filesPickerProps,
  isMultiple,
  fileTypes,
  fileType,
  ignored,
  ...rest
}: FilesPickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      isRequired={isRequired}
      render={(id, field, fieldState) => (
        <FilesPicker
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          placeholder={placeholder}
          multiple={isMultiple}
          fileTypes={fileTypes}
          fileType={fileType}
          ignored={ignored}
          {...filesPickerProps}
          {...field}
        />
      )}
      {...rest}
    />
  );
};

export default FilesPickerField;
