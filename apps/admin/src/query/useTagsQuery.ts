import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Tags, TagsDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest, CommonRowsResponse } from '../types';

interface UseTagsQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'tags';

export const useTagsQuery = ({ id }: UseTagsQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Tags>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(endpoints.tags).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, TagsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios.get(`${endpoints.tags}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<
    {
      id: number;
    },
    unknown,
    TagsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.tags}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<CommonRowsResponse, unknown, TagsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.tags}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<
    CommonRowsResponse,
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.tags}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<
    CommonRowsResponse,
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.tags}/delete`, data)
        .then((response) => response.data),
  });

  const deletePermanentMutation = useMutation<
    CommonRowsResponse,
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete-permanent`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.tags}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    tagsQuery: listQuery,
    tagsDetailQuery: detailQuery,
    tagsCreateMutation: createMutation,
    tagsPatchMutation: patchMutation,
    tagsToggleMutation: toggleMutation,
    tagsDeleteMutation: deleteMutation,
    tagsDeletePermanentMutation: deletePermanentMutation,
  };
};
