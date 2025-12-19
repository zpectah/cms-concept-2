import { ControlledForm } from '../../../components';
import { IPasswordRecoveryForm } from './types';
import { usePasswordRecoveryForm } from './usePasswordRecoveryForm';

const PasswordRecoveryForm = () => {
  const { form } = usePasswordRecoveryForm();

  return (
    <ControlledForm<IPasswordRecoveryForm>
      form={form}
    >
      <>...PasswordRecoveryForm...</>
    </ControlledForm>
  );
}

export default PasswordRecoveryForm;