import { CommentsManagerProps } from './types';

const CommentsManager = ({ contentType, contentId }: CommentsManagerProps) => {
  if (contentId === 0) return;

  return (
    <div>
      ...CommentsManager...{contentType}_{contentId}...
    </div>
  );
};

export default CommentsManager;
