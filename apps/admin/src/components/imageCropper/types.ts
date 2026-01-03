import { CropperProps } from 'react-advanced-cropper';
import { ButtonProps } from '../ui';

export interface ImageCropperProps {
  input: { source?: string } | undefined;
  onChange?: (base64: string) => void;
  onConfirm?: (base64: string) => void;
  cropperProps?: Partial<CropperProps>;
  buttonProps?: Partial<ButtonProps>;
  hidden?: boolean;
}
