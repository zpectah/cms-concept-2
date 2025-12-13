import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';
import { CONTAINER_WIDTH_CENTERED } from '../constants';
import { ViewLayout } from '../components';

const LoginView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      variant="centered"
      containerWidth={CONTAINER_WIDTH_CENTERED}
      rootUrl={routes.login.root}
      title={t('login.title')}
    >
      ...LoginView...
    </ViewLayout>
  );
};

export default LoginView;
