import { ReactNode } from 'react';

export interface LocalesTabsProps {
  locales: string[];
  locale: string;
  render: (locale: string) => ReactNode;
  onLocaleChange: (locale: string) => void;
}
