import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Requests, RequestsDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest } from '../types';

interface UseRequestsQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'requests';

export const useRequestsQuery = ({ id }: UseRequestsQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Requests>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.requests).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, RequestsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.requests}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, RequestsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.requests}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<{ rows: number }, unknown, RequestsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.requests}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.requests}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.requests}/delete`, data)
        .then((response) => response.data),
  });

  const deletePermanentMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete-permanent`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.requests}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    requestsQuery: listQuery,
    requestsDetailQuery: detailQuery,
    requestsCreateMutation: createMutation,
    requestsPatchMutation: patchMutation,
    requestsToggleMutation: toggleMutation,
    requestsDeleteMutation: deleteMutation,
    requestsDeletePermanentMutation: deletePermanentMutation,
  };
};
