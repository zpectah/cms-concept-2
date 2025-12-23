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
  ...restOfField
}: ControlledFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  const fieldId = id ? id : getRandomId(8);

  return (
    <Field label={label} id={fieldId} isRequired={isRequired} {...restOfField}>
      {render(fieldId, field, fieldState, formState)}
    </Field>
  );
};

export default ControlledField;
