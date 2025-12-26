import { Checkbox } from '../ui';
import { ControlledField } from '../field';
import { CheckboxFieldProps } from './types';

const CheckboxField = ({
  name,
  label,
  checkboxProps,
  isRequired,
  isDisabled,
  fieldLabel,
  ...rest
}: CheckboxFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Checkbox
          label={fieldLabel}
          id={id}
          checked={!!field.value}
          required={isRequired}
          disabled={isDisabled}
          color={fieldState.error ? 'error' : 'primary'}
          {...checkboxProps}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default CheckboxField;
