import { ReactNode } from 'react';
import { FieldValues, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { WithChildren } from '@common';
import { ModalCloseReason } from '../../types';
import { ButtonProps, DrawerBaseProps } from '../ui';
import { ControlledFormProps } from '../form';

export interface DetailDrawerProps<T extends FieldValues> extends WithChildren {
  /** When drawer is open */
  open: boolean;
  /** Close callback */
  onClose: (event: object, reason: ModalCloseReason) => void;
  /** Drawer width on initialize */
  initWidth?: string;
  /** Default drawer title */
  defaultTitle?: string;
  /** React Hook Form controlled form object */
  form: UseFormReturn<T>;
  /** Submit callback */
  onSubmit?: SubmitHandler<T>;
  /** Custom drawer footer actions */
  actions?: ButtonProps[];
  /** Custom drawer properties */
  drawerProps?: Partial<DrawerBaseProps>;
  /** Form reset callback */
  onReset?: () => void;
  /** Delete item callback */
  onDelete?: (id: number) => void;
  /** Detail ID */
  id: string | 'new' | undefined;
  /** Rest of controlled form props */
  formProps?: Partial<Omit<ControlledFormProps<T>, 'form'>>;
  /** In case we need to disable confirm dialog when closing form with changes */
  disableCloseConfirm?: boolean;
  /** When we need to keep content even if its closed */
  keepMounted?: boolean;
  /** When drawer finally exited */
  onExited?: () => void;
  /** External slot (outside of form) */
  externalSlot?: ReactNode;
  /** Shortcut for form id attribute */
  formId?: string;
}

export interface UseDetailDrawerProps {
  defaultTitle?: string;
}

export interface IDetailDrawerContext {
  fullscreen: boolean;
  onFullscreenToggle: () => void;
  title: string | undefined;
  setTitle: (title: string | undefined) => void;
  disableEscapeKeyDown: boolean;
  setDisableEscapeKeyDown: (state: boolean) => void;
  disableBackdropClose: boolean;
  setDisableBackdropClose: (state: boolean) => void;
}
