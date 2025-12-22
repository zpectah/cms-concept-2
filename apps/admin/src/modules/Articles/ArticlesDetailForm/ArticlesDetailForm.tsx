import { DetailDrawer, DynamicPortal } from '../../../components';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useArticlesDetailForm();

  const dynamicSlotId = 'articles-portal-target';

  return (
    <>
      <DetailDrawer<IArticlesDetailForm>
        id={id}
        open={!!id}
        defaultTitle={title}
        form={form}
        onClose={onClose}
        onSubmit={onSubmit}
        onReset={onReset}
        onDelete={onDelete}
        dynamicSlotId={dynamicSlotId}
      >
        <>...ArticlesDetailForm...id: {id}</>
      </DetailDrawer>
      {/* We must render out of the main form due to context conflict */}
      <DynamicPortal targetId={dynamicSlotId}>
        <div>Comments module</div>
      </DynamicPortal>
    </>
  );
};

export default ArticlesDetailForm;
