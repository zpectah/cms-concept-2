import { useMemo } from 'react';
import { CommentsItem, CommentsItemNode } from '@model';
import { useCommentsQuery } from '../../../../../query';
import { useCommentsManagerContext } from '../CommentsManager.context';

export const useCommentsManagerList = () => {
  const { contentType, contentId } = useCommentsManagerContext();
  const { commentsQuery } = useCommentsQuery({ contentType, contentId });

  const { data: comments, isLoading } = commentsQuery;

  const filteredComments = useMemo(() => {
    const items = (comments ?? []) as CommentsItem[];
    const itemMap: Record<string | number, CommentsItemNode> = {};

    items.forEach((item) => {
      itemMap[item.id] = { ...item, children: [] };
    });

    const rootItems: CommentsItemNode[] = [];

    items.forEach((item) => {
      const node = itemMap[item.id];

      if (item.parent_id && itemMap[item.parent_id]) {
        itemMap[item.parent_id].children.push(node);
        itemMap[item.parent_id].children.sort((a, b) => a.id - b.id);
      } else {
        rootItems.push(node);
      }
    });

    return rootItems.sort((a, b) => a.id - b.id);
  }, [comments]);

  return {
    items: filteredComments,
    isLoading,
  };
};
