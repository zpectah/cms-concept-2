import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store';
import { CONFIRM_DIALOG_WIDTH_DEFAULT } from '../../constants';
import { Dialog, PrimaryButton, SecondaryButton } from '../../components';

const ConfirmDialog = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { confirmDialog, setConfirmDialog } = useAppStore();

  const exitHandler = () => setConfirmDialog(null);

  const closeHandler = () => {
    setOpen(false);
    confirmDialog?.onCancel?.();
  };

  const confirmHandler = () => {
    confirmDialog?.onConfirm();
    closeHandler();
    exitHandler();
  };

  useEffect(() => setOpen(!!confirmDialog), [confirmDialog]);

  return (
    <Dialog
      labelId={`confirm-dialog-${confirmDialog?.context}`}
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
          <SecondaryButton onClick={closeHandler}>
            {t('button.cancel')}
          </SecondaryButton>
          <PrimaryButton onClick={confirmHandler}>
            {t('button.confirm')}
          </PrimaryButton>
        </>
      }
      maxWidth={CONFIRM_DIALOG_WIDTH_DEFAULT}
      fullWidth
      disableCloseButton
      disableBackdropClose
      // disableEscapeKeyDown
    />
  );
};

export default ConfirmDialog;
