import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getConfig } from '../../config';
import { useUserQuery } from '../../query';

const AuthLayout = () => {
  const { routes } = getConfig();

  const navigate = useNavigate();
  const { userDetailQuery } = useUserQuery();

  const { data: userData, isLoading } = userDetailQuery;

  useEffect(() => {
    if (!userData?.active && !isLoading) {
      navigate(`${routes.login.root}?reason=expired-session`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, isLoading]);

  return <Outlet />;
};

export default AuthLayout;
