import { Switch } from '../ui';
import { ControlledField } from '../field';
import { SwitchFieldProps } from './types';

const SwitchField = ({
  name,
  label,
  switchProps,
  isRequired,
  isDisabled,
  fieldLabel,
  ...rest
}: SwitchFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      render={(id, field, fieldState) => (
        <Switch
          label={fieldLabel}
          checked={!!field.value}
          required={isRequired}
          disabled={isDisabled}
          color={fieldState.error ? 'error' : 'primary'}
          {...switchProps}
          inputProps={{
            id,
            ...switchProps?.inputProps,
          }}
          {...field}
        />
      )}
      isRequired={isRequired}
      {...rest}
    />
  );
};

export default SwitchField;
