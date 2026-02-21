import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Translations, TranslationsDetail } from '@model';
import { getConfig } from '../config';
import { ApiCommonRequest, CommonRowsResponse } from '../types';

interface UseTranslationsQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'translations';

export const useTranslationsQuery = ({ id }: UseTranslationsQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Translations>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.translations).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, TranslationsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.translations}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<
    { id: number },
    unknown,
    TranslationsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.translations}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    CommonRowsResponse,
    unknown,
    TranslationsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.translations}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.translations}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.translations}/delete`, data)
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
        .patch(`${endpoints.translations}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    translationsQuery: listQuery,
    translationsDetailQuery: detailQuery,
    translationsCreateMutation: createMutation,
    translationsPatchMutation: patchMutation,
    translationsToggleMutation: toggleMutation,
    translationsDeleteMutation: deleteMutation,
    translationsDeletePermanentMutation: deletePermanentMutation,
  };
};
