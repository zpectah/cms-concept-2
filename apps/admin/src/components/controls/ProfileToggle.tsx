import { useAppStore } from '../../store';
import { useProfile } from '../../hooks';
import { ButtonBase } from '../ui';

const ProfileToggle = () => {
  const { setProfileDialog } = useAppStore();
  const { user } = useProfile();

  // TODO

  return (
    <ButtonBase variant="outline" onClick={() => setProfileDialog(true)}>
      {user.email}
    </ButtonBase>
  );
};

export default ProfileToggle;
