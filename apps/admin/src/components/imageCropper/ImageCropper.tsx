import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import { Box } from '@mui/material';
import { cropBase64Image } from '@common';
import { Button, Dialog, ButtonProps } from '../ui';
import { ImageCropperProps } from './types';

import 'react-advanced-cropper/dist/style.css';

const ImageCropper = ({
  input,
  onChange,
  onConfirm,
  cropperProps,
  buttonProps,
  hidden,
  renderButton,
}: ImageCropperProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [temporary, setTemporary] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);

  const { t } = useTranslation();

  const closeHandler = () => {
    setOpen(false);
    setTemporary(undefined);
    setSource(undefined);
  };

  const openHandler = () => {
    setOpen(true);
    setTemporary(input?.source);
  };

  const changeHandler = async (cropper: CropperRef) => {
    if (!temporary) return;

    const coordinates = cropper.getCoordinates();
    const croppedImage = await cropBase64Image({
      base64: temporary,
      y: coordinates?.top ?? 0,
      x: coordinates?.left ?? 0,
      width: coordinates?.width ?? 0,
      height: coordinates?.height ?? 0,
    });

    setSource(croppedImage);
    onChange?.(croppedImage);
  };

  const confirmHandler = useCallback(() => {
    if (source) onConfirm?.(source);

    closeHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const commonButtonProps: Partial<ButtonProps> = {
    onClick: openHandler,
    disabled: !input?.source,
    ...buttonProps,
  };

  if (hidden) return;

  return (
    <>
      {renderButton ? (
        renderButton({ ...commonButtonProps })
      ) : (
        <Button {...commonButtonProps}>{t('button.cropImage')}</Button>
      )}

      <Dialog
        open={open}
        onClose={closeHandler}
        title={t('button.cropImage')}
        maxWidth="lg"
        fullWidth
        actions={
          <>
            <Button variant="outlined" onClick={closeHandler}>
              {t('button.cancel')}
            </Button>
            <Button variant="contained" onClick={confirmHandler}>
              {t('button.confirm')}
            </Button>
          </>
        }
      >
        <Box sx={{ p: 1 }}>
          <Cropper
            src={temporary}
            onChange={changeHandler}
            className="cropper"
            style={{
              maxHeight: '50vh',
            }}
            {...cropperProps}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default ImageCropper;
