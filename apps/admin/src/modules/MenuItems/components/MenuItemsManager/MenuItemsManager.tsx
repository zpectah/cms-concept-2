import { MenuItemsManagerProps } from './types';
import { MenuItemsManagerList } from './MenuItemsManagerList';
import { MenuItemsManagerDetail } from './MenuItemsManagerDetail';
import { useMenuItemsManager } from './useMenuItemsManager';
import { MenuItemsManagerContextProvider } from './MenuItemsManager.context';

const MenuItemsManager = ({ menuId, menuPrefix }: MenuItemsManagerProps) => {
  const { ...menuItemsManager } = useMenuItemsManager(menuId);

  const contextValue = {
    menuId,
    menuPrefix,
    ...menuItemsManager,
  };

  return (
    <MenuItemsManagerContextProvider value={contextValue}>
      <MenuItemsManagerList />
      <MenuItemsManagerDetail />
    </MenuItemsManagerContextProvider>
  );
};

export default MenuItemsManager;
