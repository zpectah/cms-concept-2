import { ReactNode } from 'react';
import { InputProps as UiInputProps } from '@chakra-ui/react';
import { WithChildren } from '@common';

export type InputProps = UiInputProps;

export interface SelectOptionItem<T = string | number> {
  id: string;
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

interface BaseCustomSelectProps<T>
  extends Partial<WithChildren>,
    Omit<UiInputProps, 'value' | 'onChange'> {
  placeholder?: string;
  options?: SelectOptionItem<T>[];
  disabled?: boolean;
}

interface SingleSelectProps<T> extends BaseCustomSelectProps<T> {
  multiple?: false;
  value: T | undefined;
  onChange: (value: T) => void;
}

interface MultipleSelectProps<T> extends BaseCustomSelectProps<T> {
  multiple: true;
  value: T[];
  onChange: (value: T[]) => void;
}

export type InputSelectProps<T = string | number> =
  | SingleSelectProps<T>
  | MultipleSelectProps<T>;
