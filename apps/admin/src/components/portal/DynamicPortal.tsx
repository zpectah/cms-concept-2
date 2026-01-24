import { memo, useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { WithChildren } from '@common';

interface DynamicPortalProps extends WithChildren {
  targetId: string;
}

const DynamicPortal = ({
  children,
  targetId,
}: DynamicPortalProps): null | ReactNode => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(() =>
    typeof document !== 'undefined' ? document.getElementById(targetId) : null
  );

  useLayoutEffect(() => {
    if (targetElement && targetElement.id === targetId) return;

    const el = document.getElementById(targetId);
    if (el) {
      setTargetElement(el);
      return;
    }

    const observer = new MutationObserver(() => {
      const found = document.getElementById(targetId);
      if (found) {
        setTargetElement(found);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [targetId, targetElement]);

  if (!targetElement) return null;

  return createPortal(children, targetElement);
};

export default memo(DynamicPortal);
