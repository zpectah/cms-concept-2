import { ReactNode } from 'react';
import { ContentModelNames, EntitiesModelNames } from '@model';
import { ButtonProps, IconButtonPlusProps } from '../ui';

export interface NewItemButtonProps {
  model?: ContentModelNames | EntitiesModelNames;
}

export interface FavoriteStarProps {
  model: ContentModelNames;
  id: number;
  iconButtonProps?: Partial<IconButtonPlusProps>;
  iconSize?: string;
}

export interface DownloadButtonProps {
  source: string;
  filename: string;
  renderButton?: (props: ButtonProps) => ReactNode;
  buttonProps?: Partial<Omit<ButtonProps, 'children'>>;
  label?: string;
}
