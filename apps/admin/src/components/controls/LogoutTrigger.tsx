import { IconLogout } from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { IconButtonPlus } from '../ui';

const LogoutTrigger = () => {
  const { setConfirmDialog } = useAppStore();

  return (
    <IconButtonPlus
      tooltip="Log out"
      onClick={() => {
        setConfirmDialog({
          title: 'Exit application?',
          content: 'Are you sure you really want to exit app',
          onConfirm: () => {
            // TODO

            console.log('Confirmed action');
          },
        });
      }}
    >
      <IconLogout />
    </IconButtonPlus>
  );
};

export default LogoutTrigger;
