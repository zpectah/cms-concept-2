import { useController, useFormContext } from 'react-hook-form';
import { getRandomId } from '@common';
import { Field } from '../ui';
import { ControlledFieldProps } from './types';

const ControlledField = ({
  name,
  label,
  id,
  render,
  isRequired,
  defaultValue,
  ignoreId,
  ...restOfField
}: ControlledFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: { required: isRequired },
    defaultValue: defaultValue ?? '',
  });

  const fieldId = id ? id : getRandomId(8);

  return (
    <Field
      label={label}
      id={!ignoreId ? fieldId : undefined}
      isRequired={isRequired}
      {...restOfField}
    >
      {render(fieldId, field, fieldState, formState)}
    </Field>
  );
};

export default ControlledField;
