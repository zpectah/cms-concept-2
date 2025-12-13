import { FormProvider, FieldValues } from 'react-hook-form';
import { Form } from '../ui';
import { ControlledFormProps } from './types';

const ControlledForm = <T extends FieldValues>({
  form,
  ...rest
}: ControlledFormProps<T>) => (
  <FormProvider {...form}>
    <Form {...rest} />
  </FormProvider>
);

export default ControlledForm;
