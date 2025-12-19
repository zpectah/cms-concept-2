import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const CategoriesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.categories}
      rootUrl={routes.categories.root}
      title={t('categories.title')}
      titleSlot={<NewItemButton model={modelKeys.categories} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default CategoriesView;
