import { useMemo } from 'react';
import { MenuItemsItem, MenuItemsNode } from '@model';
import { useMenuItemsQuery } from '../../../../../query';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';

export const useMenuItemsManagerList = () => {
  const { menuId } = useMenuItemsManagerContext();
  const { menuItemsQuery } = useMenuItemsQuery({ menuId });

  const { data: menuItems, isLoading } = menuItemsQuery;

  const filteredMenuItems = useMemo(() => {
    const items = (menuItems ?? []) as MenuItemsItem[];
    const itemMap: Record<string | number, MenuItemsNode> = {};

    items.forEach((item) => {
      itemMap[item.id] = { ...item, children: [] };
    });

    const rootItems: MenuItemsNode[] = [];

    items.forEach((item) => {
      const node = itemMap[item.id];

      if (item.parent_id && itemMap[item.parent_id]) {
        itemMap[item.parent_id].children.push(node);
        itemMap[item.parent_id].children.sort(
          (a, b) => a.item_order - b.item_order
        );
      } else {
        rootItems.push(node);
      }
    });

    return rootItems.sort((a, b) => a.item_order - b.item_order);
  }, [menuItems]);

  return {
    items: filteredMenuItems,
    isLoading,
  };
};
