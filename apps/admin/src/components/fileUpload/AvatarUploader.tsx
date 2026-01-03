import { Box } from '@mui/material';
import { ImageCropper } from '../imageCropper';
import { AvatarUploaderProps } from './types';
import { useAvatarUploader } from './useAvatarUploader';
import { Button } from '../ui';

const AvatarUploader = ({
  filename,
  size = '150px',
  ...rest
}: AvatarUploaderProps) => {
  const {
    inputRef,
    onChange,
    current,
    onCurrentChange,
    onSubmit,
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
        <Button
          component="label"
          variant="contained"
          size="small"
          sx={{ opacity: 0, '.avatar-container:hover &': { opacity: 1 } }}
        >
          <span>Vybrat soubor</span>
          {inputElement}
        </Button>
      )}
      {!!current?.content && (
        <ImageCropper
          input={{ source: current?.content }}
          onConfirm={onCropConfirm}
          renderButton={(props) => (
            <Button {...props} variant="contained" size="small">
              Crop
            </Button>
          )}
        />
      )}
      {!!current && (
        <>
          <Button
            onClick={onSubmit}
            disabled={!current}
            variant="contained"
            size="small"
          >
            Nahrát
          </Button>
          <Button
            onClick={() => {
              onCurrentChange(undefined);
            }}
            disabled={!current}
            variant="contained"
            size="small"
          >
            Zrušit
          </Button>
        </>
      )}
    </Box>
  );
};

export default AvatarUploader;
