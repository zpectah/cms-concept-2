import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const TranslationsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.translations}
      rootUrl={routes.translations.root}
      title={t('translations.title')}
      titleSlot={<NewItemButton model={modelKeys.translations} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default TranslationsView;
