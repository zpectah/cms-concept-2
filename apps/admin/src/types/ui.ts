import { checkboxStateKeys, modalCloseReasonKeys } from '../enums';

export type CheckboxState = keyof typeof checkboxStateKeys;

export type SxCommonValue =
  | {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    }
  | string;

export type ModalCloseReason = keyof typeof modalCloseReasonKeys;
