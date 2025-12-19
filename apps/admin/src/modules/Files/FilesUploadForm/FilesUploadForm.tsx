import { ControlledForm } from '../../../components';
import { IFilesUploadForm } from './types';
import { useFilesUploadForm } from './useFilesUploadForm';

const FilesUploadForm = () => {
  const { form } = useFilesUploadForm();

  return (
    <ControlledForm<IFilesUploadForm>
      form={form}
    >
      <>...FilesUploadForm...</>
    </ControlledForm>
  );
}

export default FilesUploadForm;