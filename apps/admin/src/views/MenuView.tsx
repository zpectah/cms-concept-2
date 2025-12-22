import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const MenuView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.menu}
      rootUrl={routes.menu.root}
      title={t('menu.title')}
      titleSlot={<NewItemButton model={modelKeys.menu} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default MenuView;
