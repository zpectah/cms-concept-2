import { ReactNode } from 'react';
import { FieldProps } from '../field';

export interface LiteralProps extends Omit<FieldProps, 'children'> {
  value?: ReactNode;
}
