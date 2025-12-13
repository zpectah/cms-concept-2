import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAppStore } from '../../store';
import { IconButtonPlus } from '../ui';

const ProfileToggle = () => {
  const { setProfileDialog } = useAppStore();

  return (
    <IconButtonPlus tooltip="Profile" onClick={() => setProfileDialog(true)}>
      <AccountBoxIcon color="inherit" />
    </IconButtonPlus>
  );
};

export default ProfileToggle;
