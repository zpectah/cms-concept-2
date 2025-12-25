import { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  FieldPathValue,
} from 'react-hook-form';
import { FieldProps } from '../ui';

export interface ControlledFieldProps extends Omit<FieldProps, 'children'> {
  /** Name of registered field */
  name: string;
  /** Field default value */
  defaultValue?: FieldPathValue<FieldValues, string>;
  /** Render field with field options */
  render: (
    id: string,
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<FieldValues>
  ) => ReactNode;
  /** In some cases we haven't proper HTML input element to join label with */
  ignoreId?: boolean;
  /** If we want to hide whole component */
  isHidden?: boolean;
}
