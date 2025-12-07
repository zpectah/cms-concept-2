import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NEW_ITEM_KEY } from '../../../constants';

export const useArticlesDetailForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const title = useMemo(
    () => (id === NEW_ITEM_KEY ? 'New article' : 'Article detail'), // TODO
    [id]
  );

  const closeHandler = () => navigate(`/articles`);

  const resetHandler = () => {
    /* TODO */
  };

  const submitHandler = () => {
    /* TODO */
  };

  return {
    id,
    title,
    open: !!id,
    onClose: closeHandler,
    onReset: resetHandler,
    form: {}, // TODO
    onSubmit: submitHandler,
  };
};
