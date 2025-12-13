import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';
import { CONTAINER_WIDTH_CENTERED } from '../constants';
import { ViewLayout } from '../components';

const PasswordRecoveryView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      variant="centered"
      containerWidth={CONTAINER_WIDTH_CENTERED}
      rootUrl={routes.passwordRecovery.root}
      title={t('passwordRecovery.title')}
    >
      ...PasswordRecoveryView...
    </ViewLayout>
  );
};

export default PasswordRecoveryView;
