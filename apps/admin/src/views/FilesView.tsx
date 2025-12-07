import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts';
import { ViewLayout } from '../components';

const FilesView = () => {
  const { id } = useParams();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle('Files');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ViewLayout>...FilesView...{id}</ViewLayout>;
};

export default FilesView;
