import { DetailDrawer } from '../../../components';
import { IMembersDetailForm } from './types';
import { useMembersDetailForm } from './useMembersDetailForm';

const MembersDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useMembersDetailForm();

  return (
    <DetailDrawer<IMembersDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...MembersDetailForm...</>
    </DetailDrawer>
  );
};

export default MembersDetailForm;
