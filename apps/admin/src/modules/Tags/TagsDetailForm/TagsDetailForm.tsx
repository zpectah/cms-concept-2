import { DetailDrawer } from '../../../components';
import { ITagsDetailForm } from './types';
import { useTagsDetailForm } from './useTagsDetailForm';

const TagsDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useTagsDetailForm();

  return (
    <DetailDrawer<ITagsDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <>...TagsDetailForm...</>
    </DetailDrawer>
  );
};

export default TagsDetailForm;
