import { useState } from 'react';
import { UseDetailDrawerProps } from './types';

export const useDetailDrawer = ({ defaultTitle }: UseDetailDrawerProps) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(defaultTitle);
  const [disableEscapeKeyDown, setDisableEscapeKeyDown] =
    useState<boolean>(false);
  const [disableBackdropClose, setDisableBackdropClose] =
    useState<boolean>(false);

  const fullSizeToggleHandler = () => {
    setFullscreen(!fullscreen);
  };

  return {
    setFullscreen,
    context: {
      fullscreen,
      onFullscreenToggle: fullSizeToggleHandler,
      title,
      setTitle,
      disableEscapeKeyDown,
      setDisableEscapeKeyDown,
      disableBackdropClose,
      setDisableBackdropClose,
    },
  };
};
