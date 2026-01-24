import { DetailDrawer } from '../../../components';
import { IFilesUploadForm } from './types';
import { useFilesUploadForm } from './useFilesUploadForm';
import { FilesUploadQueue } from './FilesUploadQueue';

const FilesUploadForm = () => {
  const { id, title, form, formId, onSubmit, onClose, onReset } =
    useFilesUploadForm();

  return (
    <DetailDrawer<IFilesUploadForm>
      formId={formId}
      id={id}
      open={!!id && id === 'new'}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <FilesUploadQueue />
    </DetailDrawer>
  );
};

export default FilesUploadForm;
