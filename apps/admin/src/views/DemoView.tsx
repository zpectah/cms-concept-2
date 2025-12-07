import { lazy } from 'react';
import { usePageTitle } from '../helpers';
import { ViewLayout } from '../components';

const DemoExamples = lazy(() => import('../modules/Demo/DemoExamples'));

const DemoView = () => {
  usePageTitle({
    title: {
      page: 'Demo',
    },
  });

  return (
    <ViewLayout>
      <DemoExamples />
    </ViewLayout>
  );
};

export default DemoView;
