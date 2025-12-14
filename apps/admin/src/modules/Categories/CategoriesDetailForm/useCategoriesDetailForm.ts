import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { ICategoriesDetailForm } from './types';
import { categoriesDetailFormSchema } from './schema';

export const useCategoriesDetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<ICategoriesDetailForm>({
    resolver: zodResolver(categoriesDetailFormSchema),
    defaultValues: {},
  });

  const detailTitle = 'Detail title'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: ICategoriesDetailForm) => {
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
}