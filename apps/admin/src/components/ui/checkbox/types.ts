import { ReactNode } from 'react';
import {
  CheckboxProps as MuiCheckboxProps,
  SwitchProps as MuiSwitchProps,
  FormControlLabelProps,
} from '@mui/material';

export type CheckboxProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label?: ReactNode;
  inputProps?: MuiCheckboxProps;
};

export type SwitchProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label?: ReactNode;
  inputProps?: MuiSwitchProps;
};
