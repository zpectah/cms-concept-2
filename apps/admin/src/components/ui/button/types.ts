import {
  ButtonProps as UiButtonProps,
  IconButtonProps as UiIconButtonProps,
} from '@chakra-ui/react';
import { TooltipProps } from '../tooltip';

export interface ButtonProps extends UiButtonProps {
  test?: string;
}

export interface IconButtonProps extends UiIconButtonProps {
  test?: string;
}

export interface ButtonPlusProps extends ButtonProps {
  tooltipProps?: Partial<Omit<TooltipProps, 'content' | 'disabled'>>;
  tooltip: string;
  disabledTooltip?: boolean;
}

export interface IconButtonPlusProps extends IconButtonProps {
  tooltipProps?: Partial<Omit<TooltipProps, 'content' | 'disabled'>>;
  tooltip: string;
  disabledTooltip?: boolean;
}
