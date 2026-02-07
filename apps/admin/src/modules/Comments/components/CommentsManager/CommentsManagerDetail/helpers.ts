import { commentsTypeDefault, CommentsDetail } from '@model';
import { CommentsContentType } from '../types';
import { ICommentsManagerDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = ({
  sender,
  contentType,
  contentId,
}: {
  sender: string;
  contentType?: CommentsContentType | null;
  contentId?: number;
}): ICommentsManagerDetailForm => {
  return Object.assign({
    id: 0,
    type: commentsTypeDefault,
    sender: sender,
    subject: '',
    content: '',
    parent_id: 0,
    content_type: contentType,
    content_id: contentId,
    reported: false,
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (
  data: CommentsDetail
): ICommentsManagerDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: ICommentsManagerDetailForm,
  parent?: CommentsDetail
): CommentsDetail => {
  const master = Object.assign({
    ...data,
  });

  if (parent) {
    master['parent_id'] = parent.id;
  }

  return { ...master };
};
