import { DetailDrawer } from '../../../components';
import { ICategoriesDetailForm } from './types';
import { useCategoriesDetailForm } from './useCategoriesDetailForm';

const CategoriesDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useCategoriesDetailForm();

  return (
    <DetailDrawer<ICategoriesDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...CategoriesDetailForm...</>
    </DetailDrawer>
  );
};

export default CategoriesDetailForm;
