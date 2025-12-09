import { useAppStore } from '../../store';
import { useProfile } from '../../hooks';
import { Button } from '../ui';

const ProfileToggle = () => {
  const { setProfileDialog } = useAppStore();
  const { user } = useProfile();

  // TODO

  return (
    <Button variant="outline" onClick={() => setProfileDialog(true)}>
      {user.email}
    </Button>
  );
};

export default ProfileToggle;
