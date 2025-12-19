import { ControlledForm } from '../../../components';
import { ILoginForm } from './types';
import { useLoginForm } from './useLoginForm';

const LoginForm = () => {
  const { form } = useLoginForm();

  return (
    <ControlledForm<ILoginForm>
      form={form}
    >
      <>...LoginForm...</>
    </ControlledForm>
  );
}

export default LoginForm;