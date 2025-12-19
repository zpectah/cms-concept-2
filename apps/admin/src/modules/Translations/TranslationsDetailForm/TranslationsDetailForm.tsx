import { ControlledForm } from '../../../components';
import { ITranslationsDetailForm } from './types';
import { useTranslationsDetailForm } from './useTranslationsDetailForm';

const TranslationsDetailForm = () => {
  const { form } = useTranslationsDetailForm();

  return (
    <ControlledForm<ITranslationsDetailForm>
      form={form}
    >
      <>...TranslationsDetailForm...</>
    </ControlledForm>
  );
}

export default TranslationsDetailForm;