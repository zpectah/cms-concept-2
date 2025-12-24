import { ReactNode } from 'react';
import { GridProps, BoxProps } from '@mui/material';
import { WithChildren } from '@common';
import { LabelProps } from '../label';
import { fieldLayoutKeys } from './enums';

export type FieldLayout = keyof typeof fieldLayoutKeys;

export interface FieldProps extends WithChildren {
  /** Field label */
  label: ReactNode;
  /** Small caption under label, recommended for horizontal layout */
  labelCaption?: string;
  /** Field ID */
  id?: string;
  /** Is value required */
  isRequired?: boolean;
  /** Helpers messages */
  helpers?: string[];
  /** Error messages */
  errors?: string[];
  /** Layout type */
  layout?: FieldLayout;
  /** Spacing of grid and inner stacks */
  spacing?: number;
  /** Grid container size in wrapped container */
  size?: GridProps['size'];
  /** Grid container props */
  gridProps?: Partial<Omit<GridProps, 'container' | 'spacing' | 'size'>>;
  /** Label props */
  labelProps?: Partial<Omit<LabelProps, 'required' | 'htmlFor'>>;
  /** Box wrapping input */
  inputBoxProps?: Partial<BoxProps>;
}
