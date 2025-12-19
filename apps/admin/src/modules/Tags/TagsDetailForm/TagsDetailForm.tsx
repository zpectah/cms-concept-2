import { ControlledForm } from '../../../components';
import { ITagsDetailForm } from './types';
import { useTagsDetailForm } from './useTagsDetailForm';

const TagsDetailForm = () => {
  const { form } = useTagsDetailForm();

  return (
    <ControlledForm<ITagsDetailForm>
      form={form}
    >
      <>...TagsDetailForm...</>
    </ControlledForm>
  );
}

export default TagsDetailForm;