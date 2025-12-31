import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Users, UsersDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest } from '../types';

interface UseUsersQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'users';

export const useUsersQuery = ({ id }: UseUsersQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Users>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(endpoints.users).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, UsersDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.users}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, UsersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.users}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<{ rows: number }, unknown, UsersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.users}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.users}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.users}/delete`, data)
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
        .patch(`${endpoints.users}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    usersQuery: listQuery,
    usersDetailQuery: detailQuery,
    usersCreateMutation: createMutation,
    usersPatchMutation: patchMutation,
    usersToggleMutation: toggleMutation,
    usersDeleteMutation: deleteMutation,
    usersDeletePermanentMutation: deletePermanentMutation,
  };
};
