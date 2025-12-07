import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const PasswordRecoveryView = () => {
  const { token } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Password recovery');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewLayout variant="centered" containerProps={{ maxW: '2xl' }}>
      ...PasswordRecoveryView...{token}
    </ViewLayout>
  );
};

export default PasswordRecoveryView;
