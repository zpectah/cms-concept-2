import { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { FieldProps } from '../ui';

export interface ControlledFieldProps extends Omit<FieldProps, 'children'> {
  name: string;
  render: (
    id: string,
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<FieldValues>
  ) => ReactNode;
}
