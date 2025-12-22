import { DetailDrawer } from '../../../components';
import { IMenuDetailForm } from './types';
import { useMenuDetailForm } from './useMenuDetailForm';

const MenuDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useMenuDetailForm();

  return (
    <DetailDrawer<IMenuDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...MenuDetailForm...</>
    </DetailDrawer>
  );
};

export default MenuDetailForm;
