import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { IArticlesDetailForm } from './types';
import { articlesDetailFormSchema } from './schema';

export const useArticlesDetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<IArticlesDetailForm>({
    resolver: zodResolver(articlesDetailFormSchema),
    defaultValues: {},
  });

  const detailTitle = 'Article detail'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: IArticlesDetailForm) => {
    // TODO

    console.log('data', data);
  };

  const resetHandler = () => {
    // TODO

    form.reset({});

    console.log('data', form);
  };

  return {
    id,
    rootUrl,
    detailTitle,
    form,
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
  };
};
