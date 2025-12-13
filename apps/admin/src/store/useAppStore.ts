import { create } from 'zustand';
import { getRandomId } from '@common';
import {
  AnnouncementsItem,
  IConfirmDialog,
  IAnnouncement,
  IToastsItem,
  Toasts,
} from '../types';
import {
  announcementsItemSeverityKeys,
  confirmDialogContextKeys,
  toastsItemSeverityKeys,
} from '../enums';
import {
  ANNOUNCEMENT_TIMEOUT_DEFAULT,
  TOAST_TIMEOUT_DEFAULT,
} from '../constants';

interface AppStore {
  // Announcements
  announcements: AnnouncementsItem[];
  addAnnouncement: (announcement: IAnnouncement) => void;
  removeAnnouncement: (id: string) => void;
  // Toasts
  toasts: Toasts;
  addToast: (toast: IToastsItem) => void;
  removeToast: (id: string) => void;
  // Confirm dialog
  confirmDialog: IConfirmDialog | null;
  setConfirmDialog: (confirmDialog: IConfirmDialog | null) => void;
  // Profile dialog
  profileDialog: boolean;
  setProfileDialog: (open: boolean) => void;
}

const useAppStore = create<AppStore>((set, getState) => {
  const announcements: AnnouncementsItem[] = [];
  const toasts: Toasts = [];
  const confirmDialog = null;
  const profileDialog = false;

  const removeAnnouncementHandler = (id: string) => {
    const tmpAnnouncements = [...getState().announcements];
    const index = tmpAnnouncements.findIndex((item) => item.id === id);

    if (index > -1) tmpAnnouncements.splice(index, 1);

    set({ announcements: tmpAnnouncements });
  };

  const addAnnouncementHandler = ({
    title,
    severity,
    autoclose,
  }: IAnnouncement) => {
    const tmpAnnouncements = [...getState().announcements];
    const id = getRandomId();

    tmpAnnouncements.push({
      id,
      title,
      severity: severity ?? announcementsItemSeverityKeys.info,
    });

    if (autoclose) {
      const timeout =
        typeof autoclose === 'number'
          ? autoclose
          : ANNOUNCEMENT_TIMEOUT_DEFAULT;

      setTimeout(() => removeAnnouncementHandler(id), timeout);
    }

    set({ announcements: tmpAnnouncements });
  };

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
  }: IToastsItem) => {
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
    // Announcements
    announcements,
    addAnnouncement: addAnnouncementHandler,
    removeAnnouncement: removeAnnouncementHandler,
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
