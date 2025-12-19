import { ControlledForm } from '../../../components';
import { ICustomFieldsDetailForm } from './types';
import { useCustomFieldsDetailForm } from './useCustomFieldsDetailForm';

const CustomFieldsDetailForm = () => {
  const { form } = useCustomFieldsDetailForm();

  return (
    <ControlledForm<ICustomFieldsDetailForm>
      form={form}
    >
      <>...CustomFieldsDetailForm...</>
    </ControlledForm>
  );
}

export default CustomFieldsDetailForm;