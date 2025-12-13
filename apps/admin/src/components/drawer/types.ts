import { FieldValues, UseFormReturn } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { WithChildren } from '@common';
import { ButtonProps, DrawerBaseProps } from '../ui';

export interface DetailDrawerProps<T extends FieldValues> extends WithChildren {
  open: boolean;
  onClose: () => void;
  initWidth?: string;
  defaultTitle?: string;
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  actions?: ButtonProps[];
  drawerProps?: Partial<DrawerBaseProps>;
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
