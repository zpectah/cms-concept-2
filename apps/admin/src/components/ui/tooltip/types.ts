import { ReactNode, RefObject } from 'react';
import { Tooltip as UiTooltip } from '@chakra-ui/react';

export interface TooltipProps extends UiTooltip.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement | null>;
  content: ReactNode;
  contentProps?: UiTooltip.ContentProps;
  disabled?: boolean;
}
