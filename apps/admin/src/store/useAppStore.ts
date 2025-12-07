import { create } from 'zustand';
import { getRandomId } from '@common';
import { IConfirmDialog, NewToastsItem, Toasts } from '../types';
import { confirmDialogContextKeys, toastsItemSeverityKeys } from '../enums';
import { TOAST_TIMEOUT_DEFAULT } from '../constants';

interface AppStore {
  // Toasts
  toasts: Toasts;
  addToast: (toast: NewToastsItem) => void;
  removeToast: (id: string) => void;
  // Confirm dialog
  confirmDialog: IConfirmDialog | null;
  setConfirmDialog: (confirmDialog: IConfirmDialog | null) => void;
  // Profile dialog
  profileDialog: boolean;
  setProfileDialog: (open: boolean) => void;
}

const useAppStore = create<AppStore>((set, getState) => {
  const toasts: Toasts = [];
  const confirmDialog = null;
  const profileDialog = false;

  const removeToastHandler = (id: string) => {
    const tmpToasts = [...getState().toasts];
    const index = tmpToasts.findIndex((item) => item.id === id);

    if (index > -1) tmpToasts.splice(index, 1);

    set({ toasts: tmpToasts });
  };

  const addToastHandler = ({
    title,
    description,
    severity,
    autoclose,
  }: NewToastsItem) => {
    const tmpToasts = [...getState().toasts];
    const id = getRandomId();

    tmpToasts.push({
      id,
      title,
      description,
      severity: severity ?? toastsItemSeverityKeys.info,
    });

    if (autoclose) {
      const timeout =
        typeof autoclose === 'number' ? autoclose : TOAST_TIMEOUT_DEFAULT;

      setTimeout(() => removeToastHandler(id), timeout);
    }

    set({ toasts: tmpToasts });
  };

  const openConfirmDialogHandler = (confirmDialog: IConfirmDialog | null) => {
    set({
      confirmDialog: confirmDialog
        ? { ...confirmDialog, context: confirmDialogContextKeys.default }
        : null,
    });
  };

  const toggleProfileDialogHandler = (open: boolean) => {
    set({ profileDialog: open });
  };

  return {
    // Toasts
    toasts,
    addToast: addToastHandler,
    removeToast: removeToastHandler,
    // Confirm dialog
    confirmDialog,
    setConfirmDialog: openConfirmDialogHandler,
    // Profile dialog
    profileDialog,
    setProfileDialog: toggleProfileDialogHandler,
  };
});

export default useAppStore;
