import { ReactNode } from 'react';
import {
  RadioProps as MuiRadioProps,
  RadioGroupProps as MuiRadioGroupProps,
  FormControlLabelProps,
  FormControlProps,
} from '@mui/material';

export type RadioProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label?: ReactNode;
  inputProps?: MuiRadioProps;
};

export type RadioGroupItem = Omit<RadioProps, 'ref'>;

export type RadioGroupProps = MuiRadioGroupProps & {
  items: RadioGroupItem[];
  label?: ReactNode;
  controlProps?: Partial<Omit<FormControlProps, 'disabled'>>;
  disabled?: boolean;
};
