import { Stack } from '@mui/material';
import { Button } from '../../../components';
import { useAppStore } from '../../../store';

const DemoUtils = () => {
  const { setConfirmDialog, addToast, addAnnouncement } = useAppStore();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <Button
          onClick={() => {
            setConfirmDialog({
              title: 'Confirm title',
              content: 'Confirm text',
              onConfirm: () => {
                console.log('On confirm action');
              },
              onCancel: () => {
                console.log('On cancel');
              },
              context: 'default',
            });
          }}
        >
          Open confirm dialog
        </Button>

        <Button
          onClick={() => {
            addToast({
              title: 'Info toast title',
            });
          }}
        >
          Open info toast
        </Button>
        <Button
          onClick={() => {
            addToast({
              title: 'Success toast title',
              severity: 'success',
              autoclose: true,
            });
          }}
        >
          Open success toast (autoclose)
        </Button>
        <Button
          onClick={() => {
            addToast({
              title: 'Error toast title',
              severity: 'error',
            });
          }}
        >
          Open error toast
        </Button>

        <Button
          onClick={() => {
            addAnnouncement({
              title: 'Announcement text',
            });
          }}
        >
          Open info announcement
        </Button>
        <Button
          onClick={() => {
            addAnnouncement({
              title: 'Announcement success text',
              severity: 'success',
              autoclose: true,
            });
          }}
        >
          Open success announcement (autoclose)
        </Button>
        <Button
          onClick={() => {
            addAnnouncement({
              title: 'Announcement error text',
              severity: 'error',
            });
          }}
        >
          Open error announcement
        </Button>
      </Stack>
    </Stack>
  );
};

export default DemoUtils;
