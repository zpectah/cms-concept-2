import { ControlledForm } from '../../../components';
import { IMenuDetailForm } from './types';
import { useMenuDetailForm } from './useMenuDetailForm';

const MenuDetailForm = () => {
  const { form } = useMenuDetailForm();

  return (
    <ControlledForm<IMenuDetailForm>
      form={form}
    >
      <>...MenuDetailForm...</>
    </ControlledForm>
  );
}

export default MenuDetailForm;