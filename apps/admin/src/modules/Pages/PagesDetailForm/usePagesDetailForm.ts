import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { IPagesDetailForm } from './types';
import { pagesDetailFormSchema } from './schema';
import { defaultDataToForm } from './helpers';

export const usePagesDetailForm = () => {
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<IPagesDetailForm>({
    resolver: zodResolver(pagesDetailFormSchema),
    defaultValues: defaultDataToForm(/* TODO: locales */),
  });

  const closeHandler = () => navigate(rootUrl);

  const resetHandler = () => form.reset(defaultDataToForm(/* TODO: locales */));

  const submitHandler = (data: IPagesDetailForm) => {
    // TODO

    console.log('data', data);

    // TODO: callback
    closeHandler();
    addToast({
      title: `Item was successfully created/updated`,
      severity: 'success',
      autoclose: true,
    });
  };

  const deleteHandler = (id: number) => {
    console.log('delete', id);

    // TODO: callback
    closeHandler();
    addToast({
      title: `Item #${id} was successfully deleted`,
      severity: 'success',
      autoclose: true,
    });
  };

  return {
    id,
    form,
    title: 'Page detail',
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onDelete: deleteHandler,
  };
};
