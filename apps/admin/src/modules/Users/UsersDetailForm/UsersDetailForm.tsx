import { ControlledForm } from '../../../components';
import { IUsersDetailForm } from './types';
import { useUsersDetailForm } from './useUsersDetailForm';

const UsersDetailForm = () => {
  const { form } = useUsersDetailForm();

  return (
    <ControlledForm<IUsersDetailForm>
      form={form}
    >
      <>...UsersDetailForm...</>
    </ControlledForm>
  );
}

export default UsersDetailForm;