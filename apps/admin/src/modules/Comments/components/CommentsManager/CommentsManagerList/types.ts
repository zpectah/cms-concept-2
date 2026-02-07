import { CommentsItemNode } from '@model';

export interface CommentsManagerListItemProps extends CommentsItemNode {
  onDetail: (id: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onReply: (id: 'new', parentId: number) => void;
}
