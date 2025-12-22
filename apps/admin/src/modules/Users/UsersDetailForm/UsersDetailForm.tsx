import { DetailDrawer } from '../../../components';
import { IUsersDetailForm } from './types';
import { useUsersDetailForm } from './useUsersDetailForm';

const UsersDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useUsersDetailForm();

  return (
    <DetailDrawer<IUsersDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...UsersDetailForm...</>
    </DetailDrawer>
  );
};

export default UsersDetailForm;
