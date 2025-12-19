import { ControlledForm } from '../../../components';
import { IFilesDetailForm } from './types';
import { useFilesDetailForm } from './useFilesDetailForm';

const FilesDetailForm = () => {
  const { form } = useFilesDetailForm();

  return (
    <ControlledForm<IFilesDetailForm>
      form={form}
    >
      <>...FilesDetailForm...</>
    </ControlledForm>
  );
}

export default FilesDetailForm;