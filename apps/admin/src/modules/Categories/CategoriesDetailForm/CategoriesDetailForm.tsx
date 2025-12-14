import { ControlledForm } from '../../../components';
import { ICategoriesDetailForm } from './types';
import { useCategoriesDetailForm } from './useCategoriesDetailForm';

const CategoriesDetailForm = () => {
  const { form } = useCategoriesDetailForm();

  return (
    <ControlledForm<ICategoriesDetailForm>
      form={form}
    >
      <>...CategoriesDetailForm...</>
    </ControlledForm>
  );
}

export default CategoriesDetailForm;