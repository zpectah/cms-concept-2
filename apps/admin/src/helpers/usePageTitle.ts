import { useEffect } from 'react';
import { useAppContext } from '../contexts';
import { NEW_ITEM_KEY } from '../constants';

interface UsePageTitleProps {
  id?: string;
  title: {
    new?: string;
    detail?: string;
    page?: string;
  };
}

export const usePageTitle = ({ id, title }: UsePageTitleProps) => {
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    if (id) {
      if (id === NEW_ITEM_KEY) {
        setPageTitle(title?.new ?? '');
      } else {
        setPageTitle(title.detail ?? '');
      }
    } else {
      setPageTitle(title.page ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
};
