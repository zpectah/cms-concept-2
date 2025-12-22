import { DetailDrawer } from '../../../components';
import { IMessagesDetailForm } from './types';
import { useMessagesDetailForm } from './useMessagesDetailForm';

const MessagesDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useMessagesDetailForm();

  return (
    <DetailDrawer<IMessagesDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...MessagesDetailForm...</>
    </DetailDrawer>
  );
};

export default MessagesDetailForm;
