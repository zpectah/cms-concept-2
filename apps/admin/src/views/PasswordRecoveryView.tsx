import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';
import { CONTAINER_WIDTH_CENTERED } from '../constants';
import { ViewLayout } from '../components';

const PasswordRecoveryForm = lazy(
  () =>
    import(
      '../modules/PasswordRecovery/PasswordRecoveryForm/PasswordRecoveryForm'
    )
);

const PasswordRecoveryTokenForm = lazy(
  () =>
    import(
      '../modules/PasswordRecovery/PasswordRecoveryTokenForm/PasswordRecoveryTokenForm'
    )
);

const PasswordRecoveryView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);
  const { token } = useParams();

  return (
    <ViewLayout
      variant="centered"
      containerWidth={CONTAINER_WIDTH_CENTERED}
      rootUrl={routes.passwordRecovery.root}
      title={t('passwordRecovery.title')}
    >
      {token ? <PasswordRecoveryTokenForm /> : <PasswordRecoveryForm />}
    </ViewLayout>
  );
};

export default PasswordRecoveryView;
