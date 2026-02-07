import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Comments, CommentsDetail, ModelNames } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest } from '../types';

interface UseCommentsQueryProps {
  id?: number | 'new' | null;
  contentType?: ModelNames | null;
  contentId?: number;
  parentId?: number | null;
}

const QUERY_KEY_BASE = 'comments';

export const useCommentsQuery = ({
  id,
  contentType,
  contentId,
  parentId,
}: UseCommentsQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Comments>({
    queryKey: [QUERY_KEY_BASE, contentType, contentId],
    queryFn: () =>
      axios
        .get(`${endpoints.comments}/${contentType}/${contentId}`)
        .then((response) => response.data),
    enabled: !!(contentType && contentId),
  });

  const detailQuery = useQuery<unknown, unknown, CommentsDetail>({
    queryKey: [QUERY_KEY_BASE, 'detail', id],
    queryFn: () =>
      axios
        .get(`${endpoints.comments}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const parentDetailQuery = useQuery<unknown, unknown, CommentsDetail>({
    queryKey: [QUERY_KEY_BASE, 'parent-detail', parentId],
    queryFn: () =>
      axios
        .get(`${endpoints.comments}/id/${parentId}`)
        .then((response) => response.data),
    enabled: !!parentId,
  });

  const createMutation = useMutation<
    {
      id: number;
    },
    unknown,
    CommentsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, 'create'],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.comments}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    CommentsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, 'patch'],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.comments}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, 'toggle'],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.comments}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, 'delete'],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.comments}/delete`, data)
        .then((response) => response.data),
  });

  const deletePermanentMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, 'delete-permanent'],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.comments}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    commentsQuery: listQuery,
    commentsDetailQuery: detailQuery,
    commentsParentDetailQuery: parentDetailQuery,
    commentsCreateMutation: createMutation,
    commentsPatchMutation: patchMutation,
    commentsToggleMutation: toggleMutation,
    commentsDeleteMutation: deleteMutation,
    commentsDeletePermanentMutation: deletePermanentMutation,
  };
};
