import { DetailDrawer } from '../../../components';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
  const { id, detailTitle, form, onSubmit, onClose } = useArticlesDetailForm();

  return (
    <DetailDrawer<IArticlesDetailForm>
      open={!!id}
      defaultTitle={detailTitle}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <>...ArticlesDetailForm...id: {id}</>
    </DetailDrawer>
  );
};

export default ArticlesDetailForm;
