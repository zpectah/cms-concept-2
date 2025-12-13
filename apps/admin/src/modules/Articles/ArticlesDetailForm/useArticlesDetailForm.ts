import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useViewContext } from '../../../contexts';
import { IArticlesDetailForm } from './types';

export const useArticlesDetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<IArticlesDetailForm>();

  const detailTitle = 'Article detail'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: IArticlesDetailForm) => {
    // TODO

    console.log('data', data);
  };

  return {
    id,
    rootUrl,
    detailTitle,
    form,
    onSubmit: submitHandler,
    onClose: closeHandler,
  };
};
