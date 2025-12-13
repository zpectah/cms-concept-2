import { ReactNode } from 'react';
import { TextFieldProps } from '@mui/material';

export type InputProps = Omit<TextFieldProps, 'label' | 'helperText'>;

export interface InputPlusProps
  extends Omit<TextFieldProps, 'label' | 'helperText'> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export type SearchInputProps = Omit<InputPlusProps, 'type' | 'inputMode'>;
