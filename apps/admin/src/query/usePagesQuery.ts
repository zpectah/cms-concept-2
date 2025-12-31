import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Pages, PagesDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest } from '../types';

interface UsePagesQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'pages';

export const usePagesQuery = ({ id }: UsePagesQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Pages>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(endpoints.pages).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, PagesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.pages}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, PagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.pages}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<{ rows: number }, unknown, PagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.pages}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.pages}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.pages}/delete`, data)
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
        .patch(`${endpoints.pages}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    pagesQuery: listQuery,
    pagesDetailQuery: detailQuery,
    pagesCreateMutation: createMutation,
    pagesPatchMutation: patchMutation,
    pagesToggleMutation: toggleMutation,
    pagesDeleteMutation: deleteMutation,
    pagesDeletePermanentMutation: deletePermanentMutation,
  };
};
