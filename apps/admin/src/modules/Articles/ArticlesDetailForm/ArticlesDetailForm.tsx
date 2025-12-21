import { DetailDrawer, DynamicPortal } from '../../../components';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
  const { id, detailTitle, form, onSubmit, onClose, onReset } =
    useArticlesDetailForm();

  const dynamicSlotId = 'articles-portal-target';

  return (
    <>
      <DetailDrawer<IArticlesDetailForm>
        id={id}
        open={!!id}
        defaultTitle={detailTitle}
        form={form}
        onClose={onClose}
        onSubmit={onSubmit}
        onReset={onReset}
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
