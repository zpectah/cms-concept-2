import { CommentsManagerProps } from './types';
import { CommentsManagerList } from './CommentsManagerList';
import { CommentsManagerDetail } from './CommentsManagerDetail';
import { CommentsManagerContextProvider } from './CommentsManager.context';
import { useCommentsManager } from './useCommentsManager';

const CommentsManager = ({ contentType, contentId }: CommentsManagerProps) => {
  const { detailOpen, setDetailOpen, parentId, rowActions } =
    useCommentsManager({
      contentType,
      contentId,
    });

  const contextValue = {
    contentType,
    contentId,
    parentId,
    detailOpen,
    setDetailOpen,
    rowActions,
  };

  if (contentId === 0) return;

  return (
    <CommentsManagerContextProvider value={contextValue}>
      <CommentsManagerList />
      <CommentsManagerDetail />
    </CommentsManagerContextProvider>
  );
};

export default CommentsManager;
