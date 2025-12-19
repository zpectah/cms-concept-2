import { ControlledForm } from '../../../components';
import { IPagesDetailForm } from './types';
import { usePagesDetailForm } from './usePagesDetailForm';

const PagesDetailForm = () => {
  const { form } = usePagesDetailForm();

  return (
    <ControlledForm<IPagesDetailForm>
      form={form}
    >
      <>...PagesDetailForm...</>
    </ControlledForm>
  );
}

export default PagesDetailForm;