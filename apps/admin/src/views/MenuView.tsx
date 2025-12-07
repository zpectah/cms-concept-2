import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const MenuView = () => {
  const { id } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Menu');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ViewLayout>...MenuView...{id}</ViewLayout>;
};

export default MenuView;
