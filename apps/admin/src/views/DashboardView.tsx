import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { testConst } from '@common';
import { testModelConst } from '@model';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const DashboardView = () => {
  // const { t } = useTranslation();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO

  return (
    <ViewLayout>
      <div>{testConst}</div>
      <div>{testModelConst}</div>
    </ViewLayout>
  );
};

export default DashboardView;
