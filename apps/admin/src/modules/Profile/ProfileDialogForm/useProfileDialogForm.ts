import { useProfile } from '../../../hooks';

export const useProfileDialogForm = () => {
  const profile = useProfile();

  console.log('profile', profile);

  return {
    profile,
  };
};
