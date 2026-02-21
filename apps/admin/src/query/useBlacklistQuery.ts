import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Blacklist, BlacklistDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest, CommonRowsResponse } from '../types';

interface UseBlacklistQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'blacklist';

export const useBlacklistQuery = ({ id }: UseBlacklistQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Blacklist>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.blacklist).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, BlacklistDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.blacklist}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, BlacklistDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.blacklist}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    CommonRowsResponse,
    unknown,
    BlacklistDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.blacklist}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.blacklist}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.blacklist}/delete`, data)
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
        .patch(`${endpoints.blacklist}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    blacklistQuery: listQuery,
    blacklistDetailQuery: detailQuery,
    blacklistCreateMutation: createMutation,
    blacklistPatchMutation: patchMutation,
    blacklistToggleMutation: toggleMutation,
    blacklistDeleteMutation: deleteMutation,
    blacklistDeletePermanentMutation: deletePermanentMutation,
  };
};
