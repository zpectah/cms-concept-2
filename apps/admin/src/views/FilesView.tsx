import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const FilesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.files}
      rootUrl={routes.files.root}
      title={t('files.title')}
      titleSlot={<NewItemButton model={modelKeys.files} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default FilesView;
