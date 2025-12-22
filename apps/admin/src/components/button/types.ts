import { ContentModelNames, EntitiesModelNames } from '@model';
import { IconButtonPlusProps } from '../ui';

export interface NewItemButtonProps {
  model?: ContentModelNames | EntitiesModelNames;
}

export interface FavoriteStarProps {
  model: ContentModelNames;
  id: number;
  iconButtonProps?: Partial<IconButtonPlusProps>;
  iconSize?: string;
}
