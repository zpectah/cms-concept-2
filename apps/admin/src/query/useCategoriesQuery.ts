import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Categories, CategoriesDetail } from '@model';
import { getConfig } from '../config';
import {
  ApiCommonRequest,
  CommonIdAndLocalesResponse,
  CommonRowsAndLocalesResponse,
  CommonRowsResponse,
} from '../types';

interface UseCategoriesQueryProps {
  id?: string | 'new';
}

const QUERY_KEY_BASE = 'categories';

export const useCategoriesQuery = ({ id }: UseCategoriesQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, Categories>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.categories).then((response) => response.data),
  });

  const detailQuery = useQuery<unknown, unknown, CategoriesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () =>
      axios
        .get(`${endpoints.categories}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<
    CommonIdAndLocalesResponse,
    unknown,
    CategoriesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.categories}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    CommonRowsAndLocalesResponse,
    unknown,
    CategoriesDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.categories}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<
    CommonRowsResponse,
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.categories}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<
    CommonRowsResponse,
    unknown,
    ApiCommonRequest
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.categories}/delete`, data)
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
        .patch(`${endpoints.categories}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    categoriesQuery: listQuery,
    categoriesDetailQuery: detailQuery,
    categoriesCreateMutation: createMutation,
    categoriesPatchMutation: patchMutation,
    categoriesToggleMutation: toggleMutation,
    categoriesDeleteMutation: deleteMutation,
    categoriesDeletePermanentMutation: deletePermanentMutation,
  };
};
