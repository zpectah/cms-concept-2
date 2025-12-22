import { DetailDrawer } from '../../../components';
import { IPagesDetailForm } from './types';
import { usePagesDetailForm } from './usePagesDetailForm';

const PagesDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    usePagesDetailForm();

  return (
    <DetailDrawer<IPagesDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...PagesDetailForm...</>
    </DetailDrawer>
  );
};

export default PagesDetailForm;
