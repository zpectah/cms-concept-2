import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Files, FilesDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest, FilesCreateTransportRequest } from '../types';

interface UseFilesQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'files';

export const useFilesQuery = ({ id }: UseFilesQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Files>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(endpoints.files).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, FilesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.files}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<
    {
      id: number;
    },
    unknown,
    FilesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.files}/create`, data)
        .then((response) => response.data),
  });

  const uploadMutation = useMutation<
    number[],
    unknown,
    FilesCreateTransportRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-upload`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.files}/upload`, data, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    FilesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.files}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.files}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<
    {
      rows: number;
    },
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.files}/delete`, data)
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
        .patch(`${endpoints.files}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    filesQuery: listQuery,
    filesDetailQuery: detailQuery,
    filesCreateMutation: createMutation,
    filesUploadMutation: uploadMutation,
    filesPatchMutation: patchMutation,
    filesToggleMutation: toggleMutation,
    filesDeleteMutation: deleteMutation,
    filesDeletePermanentMutation: deletePermanentMutation,
  };
};
