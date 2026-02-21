import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Menu, MenuDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest, CommonRowsResponse } from '../types';

interface UseMenuQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'menu';

export const useMenuQuery = ({ id }: UseMenuQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Menu>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(endpoints.menu).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, MenuDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios.get(`${endpoints.menu}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, MenuDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.menu}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<CommonRowsResponse, unknown, MenuDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.menu}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.menu}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.menu}/delete`, data)
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
        .patch(`${endpoints.menu}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    menuQuery: listQuery,
    menuDetailQuery: detailQuery,
    menuCreateMutation: createMutation,
    menuPatchMutation: patchMutation,
    menuToggleMutation: toggleMutation,
    menuDeleteMutation: deleteMutation,
    menuDeletePermanentMutation: deletePermanentMutation,
  };
};
