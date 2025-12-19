import { ControlledForm } from '../../../components';
import { IMessagesDetailForm } from './types';
import { useMessagesDetailForm } from './useMessagesDetailForm';

const MessagesDetailForm = () => {
  const { form } = useMessagesDetailForm();

  return (
    <ControlledForm<IMessagesDetailForm>
      form={form}
    >
      <>...MessagesDetailForm...</>
    </ControlledForm>
  );
}

export default MessagesDetailForm;