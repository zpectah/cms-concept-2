import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { ViewLayout } from '../components';

const SettingsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.settings}
      rootUrl={routes.settings.root}
      title={t('settings.title')}
    >
      ...SettingsView...
    </ViewLayout>
  );
};

export default SettingsView;
