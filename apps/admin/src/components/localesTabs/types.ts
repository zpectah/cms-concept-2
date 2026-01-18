import { ReactNode } from 'react';
import { BoxProps } from '@mui/material';

export interface LocalesTabsProps {
  locales: string[];
  locale: string;
  render: (locale: string) => ReactNode;
  onLocaleChange: (locale: string) => void;
  boxProps?: Partial<BoxProps>;
}
