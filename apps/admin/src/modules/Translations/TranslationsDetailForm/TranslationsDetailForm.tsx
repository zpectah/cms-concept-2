import { DetailDrawer } from '../../../components';
import { ITranslationsDetailForm } from './types';
import { useTranslationsDetailForm } from './useTranslationsDetailForm';

const TranslationsDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useTranslationsDetailForm();

  return (
    <DetailDrawer<ITranslationsDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...TranslationsDetailForm...</>
    </DetailDrawer>
  );
};

export default TranslationsDetailForm;
