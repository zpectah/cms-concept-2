import { MenuItemsNode } from '@model';

export interface MenuItemsManagerListItemProps extends MenuItemsNode {
  onDetail: (id: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
