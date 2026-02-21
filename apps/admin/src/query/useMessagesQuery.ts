import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Messages, MessagesDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest, CommonRowsResponse } from '../types';

interface UseMessagesQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'messages';

export const useMessagesQuery = ({ id }: UseMessagesQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Messages>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.messages).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, MessagesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.messages}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<{ id: number }, unknown, MessagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.messages}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    CommonRowsResponse,
    unknown,
    MessagesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.messages}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.messages}/toggle`, data)
        .then((response) => response.data),
  });

  const readMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-read`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.messages}/read`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.messages}/delete`, data)
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
        .patch(`${endpoints.messages}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    messagesQuery: listQuery,
    messagesDetailQuery: detailQuery,
    messagesCreateMutation: createMutation,
    messagesPatchMutation: patchMutation,
    messagesToggleMutation: toggleMutation,
    messagesReadMutation: readMutation,
    messagesDeleteMutation: deleteMutation,
    messagesDeletePermanentMutation: deletePermanentMutation,
  };
};
