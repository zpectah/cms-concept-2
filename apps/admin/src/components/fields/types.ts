import {
  InputProps,
  EmailInputProps,
  SelectProps,
  DatePickerProps,
  DateTimePickerProps,
  NumberInputProps,
  NumberInputAltProps,
  NumberInputAlt2Props,
  TextareaProps,
  WysiwygProps,
} from '../ui';
import { ControlledFieldProps } from '../field';

interface FieldBase extends Omit<ControlledFieldProps, 'name' | 'render'> {
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
  numberInputProps?: Partial<
    Omit<NumberInputProps, 'fullWidth' | 'placeholder'>
  >;
}

export interface NumberAltFieldProps extends FieldBase {
  numberInputAltProps?: Partial<
    Omit<NumberInputAltProps, 'fullWidth' | 'placeholder'>
  >;
}

export interface NumberAlt2FieldProps extends FieldBase {
  numberInputAltProps?: Partial<
    Omit<NumberInputAlt2Props, 'fullWidth' | 'placeholder'>
  >;
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
