import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { useAppStore } from '../../../store';
import { useDetailFormLocales } from '../../../hooks';
import { IArticlesDetailForm } from './types';
import { articlesDetailFormSchema } from './schema';
import { defaultDataToForm } from './helpers';

export const useArticlesDetailForm = () => {
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const { locales, locale, onLocaleChange } = useDetailFormLocales();
  const form = useForm<IArticlesDetailForm>({
    resolver: zodResolver(articlesDetailFormSchema),
    defaultValues: defaultDataToForm(locales),
  });

  const resetHandler = () => form.reset(defaultDataToForm(locales));

  const closeHandler = () => {
    navigate(rootUrl);
    resetHandler();
  };

  const submitHandler = (data: IArticlesDetailForm) => {
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
    title: 'Article detail',
    // Actions
    onSubmit: submitHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onDelete: deleteHandler,
    // Locales
    localesTabs: {
      locales,
      locale,
      onLocaleChange,
    },
  };
};
