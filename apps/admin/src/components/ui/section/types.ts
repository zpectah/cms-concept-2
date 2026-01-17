import { ReactNode } from 'react';
import { WithChildren } from '@common';

export interface SectionProps extends WithChildren {
  title?: ReactNode;
  caption?: string;
  headerSlot?: ReactNode;
}
