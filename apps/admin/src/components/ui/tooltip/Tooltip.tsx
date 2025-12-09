import { forwardRef } from 'react';
import { Tooltip as UiTooltip, Portal } from '@chakra-ui/react';
import { TooltipProps } from './types';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    showArrow,
    children,
    disabled,
    portalled = true,
    content,
    contentProps,
    portalRef,
    ...rest
  } = props;

  if (disabled) return children;

  return (
    <UiTooltip.Root {...rest}>
      <UiTooltip.Trigger asChild>{children}</UiTooltip.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <UiTooltip.Positioner>
          <UiTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <UiTooltip.Arrow>
                <UiTooltip.ArrowTip />
              </UiTooltip.Arrow>
            )}
            {content}
          </UiTooltip.Content>
        </UiTooltip.Positioner>
      </Portal>
    </UiTooltip.Root>
  );
});

export default Tooltip;
