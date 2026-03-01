import { IconPower } from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { IconButtonPlus } from '../ui';
import { useUserLogout } from '../../hooks';

const LogoutTrigger = () => {
  const { setConfirmDialog } = useAppStore();
  const { onLogout } = useUserLogout();

  return (
    <IconButtonPlus
      tooltip="Log out"
      onClick={() => {
        setConfirmDialog({
          title: 'Exit application?',
          content: 'Are you sure you really want to exit app',
          onConfirm: onLogout,
        });
      }}
    >
      <IconPower />
    </IconButtonPlus>
  );
};

export default LogoutTrigger;
