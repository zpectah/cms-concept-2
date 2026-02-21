import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { MenuItems, MenuItemsDetail } from '@model';
import { getConfig } from '../config';
import {
  ApiCommonRequest,
  CommonIdAndLocalesResponse,
  CommonRowsAndLocalesResponse,
  CommonRowsResponse,
} from '../types';

interface UseMenuItemsQueryProps {
  id?: number | 'new' | null;
  menuId?: number;
}

const QUERY_KEY_BASE = 'menuitems';

export const useMenuItemsQuery = ({ id, menuId }: UseMenuItemsQueryProps) => {
  const {
    api: { endpoints },
  } = getConfig();

  const listQuery = useQuery<unknown, unknown, MenuItems>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-menu`, menuId],
    queryFn: () =>
      axios
        .get(`${endpoints.menuItems}/menu/${menuId}`)
        .then((response) => response.data),
    enabled: !!menuId && menuId !== 0,
  });

  const detailQuery = useQuery<unknown, unknown, MenuItemsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-detail`, id],
    queryFn: () =>
      axios
        .get(`${endpoints.menuItems}/id/${id}`)
        .then((response) => response.data),
    enabled: !!id && id !== 'new',
  });

  const createMutation = useMutation<
    CommonIdAndLocalesResponse,
    unknown,
    MenuItemsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.menuItems}/create`, data)
        .then((response) => response.data),
  });

  const patchMutation = useMutation<
    CommonRowsAndLocalesResponse,
    unknown,
    MenuItemsDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.menuItems}/patch`, data)
        .then((response) => response.data),
  });

  const toggleMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.menuItems}/toggle`, data)
        .then((response) => response.data),
  });

  const deleteMutation = useMutation<CommonRowsResponse, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.menuItems}/delete`, data)
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
        .patch(`${endpoints.menuItems}/delete-permanent`, data)
        .then((response) => response.data),
  });

  return {
    menuItemsQuery: listQuery,
    menuItemsDetailQuery: detailQuery,
    menuItemsCreateMutation: createMutation,
    menuItemsPatchMutation: patchMutation,
    menuItemsToggleMutation: toggleMutation,
    menuItemsDeleteMutation: deleteMutation,
    menuItemsDeletePermanentMutation: deletePermanentMutation,
  };
};
