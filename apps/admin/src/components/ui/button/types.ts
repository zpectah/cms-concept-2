import {
  IconButtonProps,
  TooltipProps,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

export interface IconButtonPlusProps extends IconButtonProps {
  tooltip?: string;
  tooltipProps?: Partial<Omit<TooltipProps, 'title'>>;
}

export type CloseButtonProps = IconButtonProps;

export type ButtonProps = MuiButtonProps & {};

export type LinkButtonProps = MuiButtonProps & {
  to: string;
};

export type PrimaryButtonProps = Omit<ButtonProps, 'variant' | 'color'> & {};
export type SecondaryButtonProps = Omit<ButtonProps, 'variant' | 'color'> & {};

export type NewButtonProps = Omit<ButtonProps, 'color'> & {};
