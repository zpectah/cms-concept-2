import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';
import { ViewLayout } from '../components';

const Dashboard = lazy(() => import('../modules/Dashboard/Dashboard'));

const DashboardView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout rootUrl={routes.dashboard.root} title={t('dashboard.title')}>
      <Dashboard />
    </ViewLayout>
  );
};

export default DashboardView;
