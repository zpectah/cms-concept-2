import { ControlledForm } from '../../../components';
import { IMembersDetailForm } from './types';
import { useMembersDetailForm } from './useMembersDetailForm';

const MembersDetailForm = () => {
  const { form } = useMembersDetailForm();

  return (
    <ControlledForm<IMembersDetailForm>
      form={form}
    >
      <>...MembersDetailForm...</>
    </ControlledForm>
  );
}

export default MembersDetailForm;