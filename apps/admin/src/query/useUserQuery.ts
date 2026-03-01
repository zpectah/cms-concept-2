import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UsersDetail } from '@model';
import { getConfig } from '../config';

const QUERY_KEY_BASE = 'user';

export const useUserQuery = () => {
  const {
    api: { endpoints },
  } = getConfig();

  const userDetailQuery = useQuery<
    unknown,
    unknown,
    { active: boolean; user: UsersDetail | null }
  >({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios
        .get(endpoints.user, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const userDetailPatchMutation = useMutation<
    { rows: number },
    unknown,
    UsersDetail
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.user}/patch`, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const userLoginCheckEmailMutation = useMutation<
    { match: boolean },
    unknown,
    { email: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-check-email`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.user}/check-email`, data)
        .then((response) => response.data),
  });

  const userLoginCheckPasswordMutation = useMutation<
    { match: boolean; id: number },
    unknown,
    { email: string; password: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-check-password`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.user}/check-password`, data)
        .then((response) => response.data),
  });

  const userLoginMutation = useMutation<
    { open: boolean; session: { id: number; email: string } },
    unknown,
    { email: string; id: number }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-login`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.user}/login`, data, {
          withCredentials: true, // TODO
        })
        .then((response) => response.data),
  });

  const userLogoutMutation = useMutation<
    { open: boolean; session: unknown },
    unknown,
    unknown
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-logout`],
    mutationFn: (data) =>
      axios
        .post(`${endpoints.user}/logout`, data, {
          withCredentials: true, // TODO
        })
        .then((response) => response.data),
  });

  const userPasswordRecoveryRequestMutation = () => null;

  const userPasswordRecoveryRequestCheckMutation = () => null;

  const userPasswordRecoveryTokenMutation = () => null;

  return {
    userDetailQuery,
    userDetailPatchMutation,
    userLoginCheckEmailMutation,
    userLoginCheckPasswordMutation,
    userLoginMutation,
    userLogoutMutation,
    userPasswordRecoveryRequestMutation,
    userPasswordRecoveryRequestCheckMutation,
    userPasswordRecoveryTokenMutation,
  };
};
