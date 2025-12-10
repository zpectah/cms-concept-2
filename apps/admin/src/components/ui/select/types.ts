import { ReactNode } from 'react';
import { SegmentGroupRootProps } from '@chakra-ui/react';
import { WithChildren } from '@common';
import { ButtonProps } from '../button';
import { InputProps } from '../input';

export interface OptionItem<T = string | number> {
  id: string;
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

interface BaseCustomSelectProps<T>
  extends Partial<WithChildren>,
    Omit<InputProps, 'value' | 'onChange'> {
  placeholder?: string;
  options?: OptionItem<T>[];
  disabled?: boolean;
}

interface SingleSelectProps<T> {
  multiple?: false;
  value: T | undefined;
  onChange: (value: T) => void;
}

interface MultipleSelectProps<T> {
  multiple: true;
  value: T[];
  onChange: (value: T[]) => void;
}

export type SelectBase<T = string | number> =
  | SingleSelectProps<T>
  | MultipleSelectProps<T>;

export type InputSelectProps<T = string | number> = BaseCustomSelectProps<T> &
  SelectBase<T>;

export interface ButtonSelectProps extends Partial<WithChildren> {
  placeholder?: string;
  options?: OptionItem<string | number>[];
  disabled?: boolean;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  buttonProps?: Partial<ButtonProps>;
}

export interface ButtonSegmentProps
  extends Partial<Omit<SegmentGroupRootProps, 'value' | 'onChange'>> {
  options?: OptionItem<string | number>[];
  disabled?: boolean;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
}

export type TagSelectProps<T = string | number> = SelectBase<T> & {
  options?: OptionItem<T>[];
  disabled?: boolean;
  buttonProps?: Partial<ButtonProps>;
  renderSelectedValue?: (option: OptionItem<T>) => ReactNode;
};
