import { useController, useFormContext } from 'react-hook-form';
import { getRandomId } from '@common';
import { Field } from '../ui';
import { ControlledFieldProps } from './types';

const ControlledField = ({
  name,
  label,
  htmlFor,
  render,
  isRequired,
  isHidden,
  defaultValue,
  ignoreId,
  errors,
  ...restOfField
}: ControlledFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: { required: isRequired },
    defaultValue: defaultValue ?? '',
  });

  const fieldId = htmlFor ? htmlFor : getRandomId(8);
  const fieldErrorMessage = fieldState.error?.message;
  const fieldErrorMessages: string[] = errors ? [...errors] : [];

  if (fieldErrorMessage) fieldErrorMessages.push(fieldErrorMessage);

  if (isHidden) return;

  return (
    <Field
      label={label}
      htmlFor={!ignoreId ? fieldId : undefined}
      isRequired={isRequired}
      errors={fieldErrorMessages}
      {...restOfField}
    >
      {render(fieldId, field, fieldState, formState)}
    </Field>
  );
};

export default ControlledField;
