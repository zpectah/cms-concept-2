import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Members, MembersDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest } from '../types';

interface UseMembersQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'members';

export const useMembersQuery = ({ id }: UseMembersQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Members>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.members).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, MembersDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.members}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, MembersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.members}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<{ rows: number }, unknown, MembersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.members}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.members}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.members}/delete`, data)
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
        .patch(`${endpoints.members}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    membersQuery: listQuery,
    membersDetailQuery: detailQuery,
    membersCreateMutation: createMutation,
    membersPatchMutation: patchMutation,
    membersToggleMutation: toggleMutation,
    membersDeleteMutation: deleteMutation,
    membersDeletePermanentMutation: deletePermanentMutation,
  };
};
