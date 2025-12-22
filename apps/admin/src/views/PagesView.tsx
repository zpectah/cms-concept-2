import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const PagesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.pages}
      rootUrl={routes.pages.root}
      title={t('pages.title')}
      titleSlot={<NewItemButton model={modelKeys.pages} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default PagesView;
