import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Button } from '../ui';
import { ImageCropper } from '../imageCropper';
import { AvatarUploaderProps } from './types';
import { useAvatarUploader } from './useAvatarUploader';

const AvatarUploader = ({
  filename,
  size = '150px',
  disabled,
  ...rest
}: AvatarUploaderProps) => {
  const { t } = useTranslation();
  const {
    inputRef,
    onChange,
    current,
    onSubmit,
    onReset,
    onClear,
    imageSrc,
    onCropConfirm,
  } = useAvatarUploader({
    ...rest,
    filename,
  });

  const isCurrent = filename !== '';
  const inputElement = (
    <input
      type="file"
      accept={'image/*'}
      ref={inputRef}
      onChange={(event) => onChange(event.target.files)}
      hidden
    />
  );

  return (
    <Box
      className="avatar-container"
      sx={({ palette, shape, spacing }) => ({
        width: size,
        height: size,
        border: isCurrent
          ? `1px solid ${palette.text.secondary}`
          : `2px dashed ${palette.divider}`,
        borderRadius: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        flexDirection: 'column',
        gap: spacing(1),

        '& img': {
          position: 'absolute',
          zIndex: -1,
          maxWidth: '100%',
          height: 'auto',
        },
      })}
    >
      {imageSrc && <img src={imageSrc} alt="avatar-image" loading="lazy" />}
      {!current?.content && (
        <>
          <Button
            component="label"
            variant="contained"
            size="small"
            sx={{ opacity: 0, '.avatar-container:hover &': { opacity: 1 } }}
            disabled={disabled}
          >
            <span>{t('button.select_file', { count: 1 })}</span>
            {inputElement}
          </Button>
          {!!filename && (
            <Button
              variant="contained"
              size="small"
              onClick={onClear}
              sx={{ opacity: 0, '.avatar-container:hover &': { opacity: 1 } }}
            >
              {t('button.clear')}
            </Button>
          )}
        </>
      )}
      {!!current?.content && (
        <ImageCropper
          input={{ source: current?.content }}
          onConfirm={onCropConfirm}
          renderButton={(props) => (
            <Button {...props} variant="contained" size="small">
              {t('button.crop_file')}
            </Button>
          )}
          cropperProps={{
            aspectRatio: {
              minimum: 1,
              maximum: 1,
            },
          }}
        />
      )}
      {!!current && (
        <>
          <Button
            onClick={onSubmit}
            disabled={!current}
            variant="contained"
            color="success"
            size="small"
          >
            {t('button.upload')}
          </Button>
          <Button
            onClick={onReset}
            disabled={!current}
            variant="contained"
            color="warning"
            size="small"
          >
            {t('button.cancel')}
          </Button>
        </>
      )}
    </Box>
  );
};

export default AvatarUploader;
