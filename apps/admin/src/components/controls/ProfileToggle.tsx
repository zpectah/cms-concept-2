import { IconUserSquare } from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { IconButtonPlus } from '../ui';

const ProfileToggle = () => {
  const { setProfileDialog } = useAppStore();

  return (
    <IconButtonPlus tooltip="Profile" onClick={() => setProfileDialog(true)}>
      <IconUserSquare />
    </IconButtonPlus>
  );
};

export default ProfileToggle;
