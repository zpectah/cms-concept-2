import { DetailDrawer } from '../../../components';
import { IFilesUploadForm } from './types';
import { useFilesUploadForm } from './useFilesUploadForm';

const FilesUploadForm = () => {
  const { id, title, form, onSubmit, onClose, onReset } = useFilesUploadForm();

  return (
    <DetailDrawer<IFilesUploadForm>
      id={id}
      open={!!id && id === 'new'}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <>...FilesUploadForm...</>
    </DetailDrawer>
  );
};

export default FilesUploadForm;
