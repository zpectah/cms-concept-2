import { Wysiwyg } from '../ui';
import { ControlledField } from '../field';
import { WysiwygFieldProps } from './types';

const WysiwygField = ({
  name,
  label,
  wysiwygProps,
  isRequired,
  isDisabled,
  isReadOnly,
  placeholder,
  ...rest
}: WysiwygFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Wysiwyg
          id={id}
          isError={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder}
          {...wysiwygProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default WysiwygField;
