import { useUserQuery } from '../query';
import { useMemo } from 'react';

export const useProfile = () => {
  const { userDetailQuery } = useUserQuery();

  const { data: detailData, isLoading } = userDetailQuery;

  const defaults = {
    user: {
      id: 0,
      name: '',
      email: '',
      firstName: '',
      lastName: '',
      uid: '',
      access_rights: 0,
    },
    active: false,
  };

  return useMemo(
    () =>
      detailData
        ? detailData
        : isLoading
        ? {
            ...defaults,
            active: true,
          }
        : defaults,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [detailData, isLoading]
  );
};
