import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';
import { MenuItemsManagerProps } from './types';
import { MenuItemsManagerList } from './MenuItemsManagerList';
import { MenuItemsManagerDetail } from './MenuItemsManagerDetail';
import { useMenuItemsManager } from './useMenuItemsManager';
import { MenuItemsManagerContextProvider } from './MenuItemsManager.context';

const MenuItemsManager = ({ menuId, menuPrefix }: MenuItemsManagerProps) => {
  const { t } = useTranslation(['views']);
  const { ...menuItemsManager } = useMenuItemsManager(menuId);

  const contextValue = {
    menuId,
    menuPrefix,
    ...menuItemsManager,
  };

  if (menuId === 0)
    return (
      <Alert severity="info" sx={{ width: '100%' }}>
        {t('views:menu.messages.info.newMenu')}
      </Alert>
    );

  return (
    <MenuItemsManagerContextProvider value={contextValue}>
      <MenuItemsManagerList />
      <MenuItemsManagerDetail />
    </MenuItemsManagerContextProvider>
  );
};

export default MenuItemsManager;
