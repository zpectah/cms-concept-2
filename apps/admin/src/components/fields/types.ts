import { InputProps, EmailInputProps, SelectProps } from '../ui';
import { ControlledFieldProps } from '../field';

interface FieldBase extends Omit<ControlledFieldProps, 'name' | 'render'> {
  name: string;
  label: string;
  id?: string;
}

export interface InputFieldProps extends FieldBase {
  inputProps?: Partial<InputProps>;
}

export interface EmailFieldProps extends FieldBase {
  inputProps?: Partial<EmailInputProps>;
}

export interface SelectFieldProps extends FieldBase {
  selectProps?: Partial<Omit<SelectProps, 'options'>>;
  options: SelectProps['options'];
}
