import { TextFieldProps } from '@mui/material';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

interface PickerBase {
  id?: string;
  isError?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export type DatePickerProps = Omit<
  MuiDatePickerProps<never>,
  'enableAccessibleFieldDOMStructure'
> &
  PickerBase;

export type DateTimePickerProps = Omit<
  MuiDateTimePickerProps<never>,
  'enableAccessibleFieldDOMStructure'
> &
  PickerBase;

export type ValuePickerProps = Omit<TextFieldProps, 'label' | 'helperText'> & {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  isReadOnly?: boolean;
};
