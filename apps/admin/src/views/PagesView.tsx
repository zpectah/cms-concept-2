import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const PagesView = () => {
  const { id } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Pages');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ViewLayout>...PagesView...{id}</ViewLayout>;
};

export default PagesView;
