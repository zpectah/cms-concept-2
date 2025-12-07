import { useAppStore } from '../../store';
import { Dialog } from '../ui';

const ConfirmDialog = () => {
  const { confirmDialog, setConfirmDialog } = useAppStore();

  return (
    <Dialog
      open={!!confirmDialog}
      onOpenChange={(open) => {
        if (!open) setConfirmDialog(null);
      }}
      title={confirmDialog?.title}
      actions={[
        {
          id: 'confirm',
          label: 'Confirm',
          onClick: () => {
            confirmDialog?.onConfirm();
            setConfirmDialog(null);
          },
        },
        {
          id: 'cancel',
          label: 'Cancel',
          onClick: () => {
            setConfirmDialog(null);
            confirmDialog?.onCancel?.();
          },
          variant: 'outline',
        },
      ]}
      rootProps={{ placement: 'center', unmountOnExit: true }}
    >
      <p>{confirmDialog?.content}</p>
    </Dialog>
  );
};

export default ConfirmDialog;
