import { FormProps } from '../ui';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface ControlledFormProps<T extends FieldValues>
  extends Omit<FormProps, 'form'> {
  form: UseFormReturn<T>;
}
