import { Textarea } from '../ui';
import { ControlledField } from '../field';
import { TextareaFieldProps } from './types';

const TextareaField = ({
  name,
  label,
  textareaProps,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  ...rest
}: TextareaFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Textarea
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          {...textareaProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default TextareaField;
