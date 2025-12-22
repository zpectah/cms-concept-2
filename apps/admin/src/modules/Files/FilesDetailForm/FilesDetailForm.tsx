import { DetailDrawer } from '../../../components';
import { IFilesDetailForm } from './types';
import { useFilesDetailForm } from './useFilesDetailForm';

const FilesDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useFilesDetailForm();

  return (
    <DetailDrawer<IFilesDetailForm>
      id={id}
      open={!!id && id !== 'new'}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...FilesDetailForm...</>
    </DetailDrawer>
  );
};

export default FilesDetailForm;
