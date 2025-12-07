import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const SettingsView = () => {
  const { panel } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Settings');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ViewLayout>...SettingsView...{panel}</ViewLayout>;
};

export default SettingsView;
