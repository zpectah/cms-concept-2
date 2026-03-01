import { useNavigate } from 'react-router-dom';
import { getConfig } from '../config';
import { useUserQuery } from '../query';
import { useResponseMessage } from './useResponseMessage';

export const useUserLogout = () => {
  const { routes } = getConfig();

  const navigate = useNavigate();
  const { onError } = useResponseMessage();
  const { userLogoutMutation } = useUserQuery();

  const { mutate: onLogout } = userLogoutMutation;

  const logoutHandler = () => {
    onLogout(
      {},
      {
        onSuccess: ({ open, session }) => {
          if (!open) {
            navigate(`${routes.login.root}?reason=logout`, { replace: true });
          }
        },
        onError,
      }
    );
  };

  return {
    onLogout: logoutHandler,
  };
};
