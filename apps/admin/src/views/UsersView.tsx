import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { ViewLayout } from '../components';

const UsersView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.users}
      rootUrl={routes.users.root}
      title={t('users.title')}
    >
      ...UsersView...
    </ViewLayout>
  );
};

export default UsersView;
