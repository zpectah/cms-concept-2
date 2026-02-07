import { ModelNames } from '@model';

export type CommentsContentType = ModelNames;

export interface CommentsManagerProps {
  contentType?: CommentsContentType;
  contentId?: number;
}

export type UseCommentsManagerProps = CommentsManagerProps & {};
