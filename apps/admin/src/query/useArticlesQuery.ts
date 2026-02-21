import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Articles, ArticlesDetail } from '@model';
import { getConfig } from '../config';
import {
  ApiCommonRequest,
  CommonIdAndLocalesResponse,
  CommonRowsAndLocalesResponse,
  CommonRowsResponse,
} from '../types';

interface UseArticlesQueryProps {
  id?: string | 'new';
  cloneId?: string | null;
}

const QUERY_KEY_BASE = 'articles';

export const useArticlesQuery = ({ id, cloneId }: UseArticlesQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Articles>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.articles).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, ArticlesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.articles}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const cloneDetailQuery = useQuery<unknown, unknown, ArticlesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-clone-${cloneId}`],
    queryFn: () =>
      axios
        .get(`${endpoints.articles}/id/${cloneId}`)
        .then((response) => response.data),
    enabled: !!cloneId && id === 'new',
  });

  const createMutation = useMutation<
    CommonIdAndLocalesResponse,
    unknown,
    ArticlesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.articles}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    CommonRowsAndLocalesResponse,
    unknown,
    ArticlesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.articles}/patch`, data)
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
        .patch(`${endpoints.articles}/toggle`, data)
        .then((response) => response.data),
  });

  const approveMutation = useMutation<
    CommonRowsResponse,
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-approve`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.articles}/approve`, data)
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
        .patch(`${endpoints.articles}/delete`, data)
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
        .patch(`${endpoints.articles}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    articlesQuery: listQuery,
    articlesDetailQuery: detailQuery,
    articlesCloneDetailQuery: cloneDetailQuery,
    articlesCreateMutation: createMutation,
    articlesPatchMutation: patchMutation,
    articlesToggleMutation: toggleMutation,
    articlesApproveMutation: approveMutation,
    articlesDeleteMutation: deleteMutation,
    articlesDeletePermanentMutation: deletePermanentMutation,
  };
};
