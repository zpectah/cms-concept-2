import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { ICustomFieldsDetailForm } from './types';
import { customFieldsDetailFormSchema } from './schema';

export const useCustomFieldsDetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<ICustomFieldsDetailForm>({
    resolver: zodResolver(customFieldsDetailFormSchema),
    defaultValues: {},
  });

  const detailTitle = 'Detail title'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: ICustomFieldsDetailForm) => {
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