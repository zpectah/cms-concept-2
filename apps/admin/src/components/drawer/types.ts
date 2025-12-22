import { FieldValues, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { WithChildren } from '@common';
import { ButtonProps, DrawerBaseProps } from '../ui';
import { ControlledFormProps } from '../form';

export interface DetailDrawerProps<T extends FieldValues> extends WithChildren {
  /** When drawer is open */
  open: boolean;
  /** Close callback */
  onClose: () => void;
  /** Drawer width on initialize */
  initWidth?: string;
  /** Default drawer title */
  defaultTitle?: string;
  /** React Hook Form controlled form object */
  form: UseFormReturn<T>;
  /** Submit callback */
  onSubmit: SubmitHandler<T>;
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
  /** Dynamic portal slot ID for externally render node and put it in form */
  dynamicSlotId?: string;
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
