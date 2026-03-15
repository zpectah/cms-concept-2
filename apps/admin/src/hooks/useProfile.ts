import { useUserQuery } from '../query';
import { useMemo } from 'react';
import { usersTypeDefault, UsersDetail } from '@model';

export const useProfile = () => {
  const { userDetailQuery } = useUserQuery();

  const { data: detailData, isLoading, isFetchedAfterMount } = userDetailQuery;

  const defaults = {
    user: {
      id: 0,
      type: usersTypeDefault,
      name: '',
      email: '',
      firstName: '',
      lastName: '',
      uid: '',
      access_rights: 0,
      avatar_image: '',
      avatar_hash: '',
      active: false,
      deleted: false,
    } as UsersDetail,
    active: false,
    isLoaded: false,
  };

  return useMemo(() => {
    const baseData = detailData
      ? detailData
      : isLoading
      ? {
          ...defaults,
          active: true,
        }
      : defaults;

    return {
      ...baseData,
      isLoaded: isFetchedAfterMount,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailData, isLoading, isFetchedAfterMount]);
};
