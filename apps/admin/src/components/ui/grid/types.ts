import { GridProps } from '@mui/material';
import { WithChildren } from '@common';

export interface GridActionsProps extends WithChildren {
  disableSeparator?: boolean;
}

export interface GridHeadingProps {
  title: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  disableSeparator?: boolean;
  gridProps?: Partial<Omit<GridProps, 'container'>>;
}
