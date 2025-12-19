import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { ITagsDetailForm } from './types';
import { tagsDetailFormSchema } from './schema';

export const useTagsDetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<ITagsDetailForm>({
    resolver: zodResolver(tagsDetailFormSchema),
    defaultValues: {},
  });

  const detailTitle = 'Detail title'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: ITagsDetailForm) => {
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