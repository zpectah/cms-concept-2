import { useAppStore } from '../../store';
import { CONFIRM_DIALOG_WIDTH_DEFAULT } from '../../constants';
import { Dialog, PrimaryButton, SecondaryButton } from '../../components';

const ConfirmDialog = () => {
  const { confirmDialog, setConfirmDialog } = useAppStore();

  const closeHandler = () => {
    confirmDialog?.onCancel?.();
    setConfirmDialog(null);
  };

  const confirmHandler = () => {
    confirmDialog?.onConfirm();
    setConfirmDialog(null);
  };

  return (
    <Dialog
      labelId="confirm-dialog"
      open={!!confirmDialog}
      onClose={closeHandler}
      title={confirmDialog?.title}
      text={confirmDialog?.content}
      actions={
        <>
          <SecondaryButton onClick={closeHandler}>Cancel</SecondaryButton>
          <PrimaryButton onClick={confirmHandler}>Confirm</PrimaryButton>
        </>
      }
      maxWidth={CONFIRM_DIALOG_WIDTH_DEFAULT}
      fullWidth
      disableEscapeKeyDown
      disableBackdropClose
    />
  );
};

export default ConfirmDialog;
