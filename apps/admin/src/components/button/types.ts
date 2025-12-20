import { ContentModelNames } from '@model';
import { IconButtonPlusProps } from '../ui';

export interface NewItemButtonProps {
  model?: ContentModelNames;
}

export interface FavoriteStarProps {
  model: ContentModelNames;
  id: number;
  iconButtonProps?: Partial<IconButtonPlusProps>;
  iconSize?: string;
}
