import { useTranslation } from 'react-i18next';
import { styled, Box, Typography } from '@mui/material';
import { ImageViewerProps } from './types';
import { getConfig } from '../../config';

const ImageContainer = styled(Box)(() => ({
  margin: 0,
  padding: 0,
  display: 'inline-flex',
  position: 'relative',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageElement = styled('img')(() => ({
  margin: 0,
  padding: 0,
  maxWidth: '100%',
  height: 'auto',
  position: 'relative',
  top: 0,
  left: 0,
}));

const ImageViewer = ({ src, alt, size }: ImageViewerProps) => {
  const {
    uploads: { source },
  } = getConfig();

  const { t } = useTranslation(['common']);

  const pathBase = `${source}image/`;
  const fullPath = `${pathBase}${src}`;

  return (
    <ImageContainer
      sx={({ palette }) => ({
        width: size ? `${size}px` : 'initial',
        height: size ? `${size}px` : 'initial',
      })}
    >
      {src ? (
        <ImageElement src={fullPath} alt={alt} loading="lazy" />
      ) : (
        <Typography variant="caption" color="textDisabled">
          {t('label.notFound')}
        </Typography>
      )}
    </ImageContainer>
  );
};

export default ImageViewer;
