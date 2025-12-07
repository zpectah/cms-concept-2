import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const CategoriesView = () => {
  const { id } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Categories');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ViewLayout>...CategoriesView...{id}</ViewLayout>;
};

export default CategoriesView;
