import { lazy } from 'react';
import { ViewLayout } from '../components';
import { getConfig } from '../config';

const Demo = lazy(() => import('../modules/Demo/Demo'));

const DemoView = () => {
  const { routes } = getConfig();

  return (
    <ViewLayout title="Demo examples" rootUrl={routes.demo.root}>
      <Demo />
    </ViewLayout>
  );
};

export default DemoView;
