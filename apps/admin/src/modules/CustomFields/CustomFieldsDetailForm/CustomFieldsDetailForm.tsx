import { DetailDrawer } from '../../../components';
import { ICustomFieldsDetailForm } from './types';
import { useCustomFieldsDetailForm } from './useCustomFieldsDetailForm';

const CustomFieldsDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useCustomFieldsDetailForm();

  return (
    <DetailDrawer<ICustomFieldsDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...CustomFieldsDetailForm...</>
    </DetailDrawer>
  );
};

export default CustomFieldsDetailForm;
