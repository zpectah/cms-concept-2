import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { IMenuDetailForm } from './types';
import { menuDetailFormSchema } from './schema';

export const useMenuDetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<IMenuDetailForm>({
    resolver: zodResolver(menuDetailFormSchema),
    defaultValues: {},
  });

  const detailTitle = 'Detail title'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: IMenuDetailForm) => {
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