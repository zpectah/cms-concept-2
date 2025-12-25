import { ReactNode } from 'react';
import { TextFieldProps } from '@mui/material';

export type InputProps = Omit<TextFieldProps, 'label' | 'helperText'> & {
  isReadOnly?: boolean;
};

export interface InputPlusProps
  extends Omit<TextFieldProps, 'label' | 'helperText'> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isReadOnly?: boolean;
}

export type SearchInputProps = Omit<InputPlusProps, 'type' | 'inputMode'>;

export type EmailInputProps = Omit<InputPlusProps, 'type' | 'inputMode'>;

export type PasswordInputProps = Omit<InputPlusProps, 'type'> & {
  initialShow?: boolean;
  disableToggle?: boolean;
};

export type PhoneInputProps = Omit<InputPlusProps, 'type' | 'inputMode'>;

export type NumberInputProps = Omit<
  InputPlusProps,
  'type' | 'inputMode' | 'multiline'
>;

export type NumberInputAltProps = Omit<
  NumberInputProps,
  'onChange' | 'startAdornment' | 'endAdornment' | 'multiline'
> & {
  pattern?: string;
  onChange?: (value: number) => void;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  centered?: boolean;
};

export type TextareaProps = Omit<InputPlusProps, 'type' | 'inputMode'>;
