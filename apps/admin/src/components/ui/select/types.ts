import { ReactNode } from 'react';
import { SelectProps as MuiSelectProps, MenuItemProps } from '@mui/material';
import { ButtonProps } from '../button';

export interface OptionItem<T = string | number> {
  id: string;
  value: T;
  label: ReactNode;
  itemProps?: Partial<Omit<MenuItemProps, 'children'>>;
  disabled?: boolean;
  hidden?: boolean;
}

interface SelectOptionsProps {
  options: OptionItem[];
}

interface SingleSelectProps<T> {
  multiple?: false;
  value?: T | undefined;
  defaultValue?: T | undefined;
  onChange?: (value: T) => void;
}

interface MultipleSelectProps<T> {
  multiple: true;
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
}

export type SelectBase<T = string | number> =
  | SingleSelectProps<T>
  | MultipleSelectProps<T>;

export type SelectProps = Omit<MuiSelectProps, 'label' | 'helperText'> &
  SelectOptionsProps & {
    options: OptionItem[];
    placeholder?: string;
  };

export type TagSelectProps<T = string | number> = SelectOptionsProps &
  SelectBase<T> & {
    disabled?: boolean;
    renderSelectedValue?: (option: OptionItem<T>) => ReactNode;
    renderSelectedIcon?: (option: OptionItem<T>) => ReactNode;
    label?: string;
  };

export interface ButtonSelectProps extends SelectOptionsProps {
  label?: string;
  id?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  buttonProps?: Partial<ButtonProps>;
}
