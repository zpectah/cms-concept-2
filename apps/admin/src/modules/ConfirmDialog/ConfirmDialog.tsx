import { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { CONFIRM_DIALOG_WIDTH_DEFAULT } from '../../constants';
import { Dialog, PrimaryButton, SecondaryButton } from '../../components';

const ConfirmDialog = () => {
  const [open, setOpen] = useState(false);

  const { confirmDialog, setConfirmDialog } = useAppStore();

  const exitHandler = () => setConfirmDialog(null);

  const closeHandler = () => {
    setOpen(false);
    confirmDialog?.onCancel?.();
  };

  const confirmHandler = () => {
    confirmDialog?.onConfirm();
    closeHandler();
  };

  useEffect(() => setOpen(!!confirmDialog), [confirmDialog]);

  return (
    <Dialog
      labelId="confirm-dialog"
      open={open}
      onClose={closeHandler}
      title={confirmDialog?.title}
      text={confirmDialog?.content}
      slotProps={{
        transition: {
          onExited: exitHandler,
        },
      }}
      actions={
        <>
          <SecondaryButton onClick={closeHandler}>Cancel</SecondaryButton>
          <PrimaryButton onClick={confirmHandler}>Confirm</PrimaryButton>
        </>
      }
      maxWidth={CONFIRM_DIALOG_WIDTH_DEFAULT}
      fullWidth
      // disableEscapeKeyDown
      disableBackdropClose
    />
  );
};

export default ConfirmDialog;
