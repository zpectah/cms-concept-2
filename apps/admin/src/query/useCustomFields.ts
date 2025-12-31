import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CustomFields, CustomFieldsDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest } from '../types';

interface UseCustomFieldsQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'customFields';

export const useCustomFieldsQuery = ({ id }: UseCustomFieldsQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, CustomFields>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.customFields).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, CustomFieldsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.customFields}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<
    { id: number },
    unknown,
    CustomFieldsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.customFields}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    { rows: number },
    unknown,
    CustomFieldsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.customFields}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.customFields}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.customFields}/delete`, data)
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
        .patch(`${endpoints.customFields}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    customFieldsQuery: listQuery,
    customFieldsDetailQuery: detailQuery,
    customFieldsCreateMutation: createMutation,
    customFieldsPatchMutation: patchMutation,
    customFieldsToggleMutation: toggleMutation,
    customFieldsDeleteMutation: deleteMutation,
    customFieldsDeletePermanentMutation: deletePermanentMutation,
  };
};
