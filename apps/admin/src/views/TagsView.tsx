import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const TagsView = () => {
  const { id } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Tags');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ViewLayout>...TagsView...{id}</ViewLayout>;
};

export default TagsView;
