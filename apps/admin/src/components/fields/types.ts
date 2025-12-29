import {
  InputProps,
  EmailInputProps,
  SelectProps,
  DatePickerProps,
  DateTimePickerProps,
  NumberInputProps,
  NumberInputAltProps,
  NumberInputAlt2Props,
  PasswordInputProps,
  PhoneInputProps,
  CheckboxProps,
  SwitchProps,
  RadioGroupProps,
  TextareaProps,
  WysiwygProps,
} from '../ui';
import { ControlledFieldProps } from '../field';

export interface FieldBase
  extends Omit<ControlledFieldProps, 'name' | 'render'> {
  name: string;
  label: string;
  id?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  placeholder?: string;
}

export interface InputFieldProps extends FieldBase {
  inputProps?: Partial<Omit<InputProps, 'fullWidth' | 'placeholder'>>;
}

export interface EmailFieldProps extends FieldBase {
  inputProps?: Partial<Omit<EmailInputProps, 'fullWidth' | 'placeholder'>>;
}

export interface SelectFieldProps extends FieldBase {
  selectProps?: Partial<
    Omit<SelectProps, 'options' | 'fullWidth' | 'placeholder'>
  >;
  options: SelectProps['options'];
}

export interface NumberFieldProps extends FieldBase {
  inputProps?: Partial<Omit<NumberInputProps, 'fullWidth' | 'placeholder'>>;
}

export interface NumberAltFieldProps extends FieldBase {
  inputProps?: Partial<Omit<NumberInputAltProps, 'fullWidth' | 'placeholder'>>;
}

export interface NumberAlt2FieldProps extends FieldBase {
  inputProps?: Partial<Omit<NumberInputAlt2Props, 'fullWidth' | 'placeholder'>>;
}

export interface PasswordFieldProps extends FieldBase {
  inputProps?: Partial<Omit<PasswordInputProps, 'fullWidth' | 'placeholder'>>;
}

export interface PhoneFieldProps extends FieldBase {
  inputProps?: Partial<Omit<PhoneInputProps, 'fullWidth' | 'placeholder'>>;
}

export interface CheckboxFieldProps
  extends Omit<FieldBase, 'isReadOnly' | 'isFullWidth' | 'placeholder'> {
  checkboxProps?: Partial<Omit<CheckboxProps, 'label'>>;
  fieldLabel?: string;
}

export interface SwitchFieldProps
  extends Omit<FieldBase, 'isReadOnly' | 'isFullWidth' | 'placeholder'> {
  switchProps?: Partial<Omit<SwitchProps, 'label'>>;
  fieldLabel?: string;
}

export interface RadioGroupFieldProps
  extends Omit<FieldBase, 'isReadOnly' | 'isFullWidth' | 'placeholder'> {
  radioGroupProps?: Partial<Omit<RadioGroupProps, 'items'>>;
  items: RadioGroupProps['items'];
}

export interface TextareaFieldProps extends FieldBase {
  textareaProps?: Partial<Omit<TextareaProps, 'fullWidth' | 'placeholder'>>;
}

export interface WysiwygFieldProps extends Omit<FieldBase, 'isFullWidth'> {
  wysiwygProps?: Partial<WysiwygProps>;
}

export interface DatePickerFieldProps extends FieldBase {
  datePickerProps?: Partial<DatePickerProps>;
}

export interface DateTimePickerFieldProps extends FieldBase {
  dateTimePickerProps?: Partial<DateTimePickerProps>;
}
