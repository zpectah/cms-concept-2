import { styled, Typography } from '@mui/material';
import {
  IconArchive,
  IconFile,
  IconVideo,
  IconPlayerSkipForwardFilled,
  IconQuestionMark,
} from '@tabler/icons-react';
import { getFileExtension } from '@common';
import { FilesType, filesTypeKeys } from '@model';
import { getConfig } from '../config';
import {
  ImageViewer,
  AudioPlayer,
  VideoPlayer,
  PdfViewer,
} from '../components';

const ThumbWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

export const useFileTypeElement = () => {
  const {
    uploads: { source },
  } = getConfig();

  const getPath = (
    type: FilesType | undefined,
    src: string,
    isThumbnail?: boolean
  ) => {
    let pathBase = `${source}${type}/`;
    if (isThumbnail) pathBase = `${pathBase}thumbnail/`;

    return `${pathBase}${src}`;
  };

  const renderFileByType = (
    source: string,
    type: FilesType | undefined,
    options?: {
      isThumbnail?: boolean;
      alt?: string;
      disableLabel?: boolean;
      customLabel?: string;
      iconSize?: string;
    }
  ) => {
    if (!source || !type) return;

    const isThumbnail = options?.isThumbnail ?? false;
    const path = getPath(type, source, isThumbnail);
    const extension = getFileExtension(source);
    const label = !options?.disableLabel ? (
      <Typography variant="body2" color="textSecondary">
        {source}
      </Typography>
    ) : options?.customLabel ? (
      <Typography variant="body2" color="textDisabled">
        {options?.customLabel}
      </Typography>
    ) : null;
    const iconSize = options?.iconSize ? options.iconSize : '2.5rem';

    switch (type) {
      case filesTypeKeys.image: {
        const elm = (
          <ImageViewer
            src={source}
            alt={options?.alt}
            isThumbnail={isThumbnail}
          />
        );

        if (isThumbnail) {
          return <ThumbWrapper>{elm}</ThumbWrapper>;
        } else {
          return elm;
        }
      }

      case filesTypeKeys.audio:
        if (isThumbnail) {
          return (
            <ThumbWrapper>
              <IconPlayerSkipForwardFilled size={iconSize} />
              {label}
            </ThumbWrapper>
          );
        } else {
          return (
            <ThumbWrapper>
              <AudioPlayer source={path} />
            </ThumbWrapper>
          );
        }

      case filesTypeKeys.video:
        if (isThumbnail) {
          return (
            <ThumbWrapper>
              <IconVideo size={iconSize} />
              {label}
            </ThumbWrapper>
          );
        } else {
          return (
            <ThumbWrapper>
              <VideoPlayer source={path} />
            </ThumbWrapper>
          );
        }

      case filesTypeKeys.document:
        if (isThumbnail) {
          return (
            <ThumbWrapper>
              <IconFile size={iconSize} />
              {label}
            </ThumbWrapper>
          );
        } else {
          if (extension === 'pdf') {
            return <PdfViewer source={path} />;
          } else {
            return (
              <ThumbWrapper>
                <IconFile size={iconSize} />
                {label}
              </ThumbWrapper>
            );
          }
        }

      case filesTypeKeys.archive:
        return (
          <ThumbWrapper>
            <IconArchive size={iconSize} />
            {label}
          </ThumbWrapper>
        );

      /** Just in case */
      case filesTypeKeys.unknown:
      case filesTypeKeys.unsupported:
      default:
        return (
          <ThumbWrapper>
            <IconQuestionMark size={iconSize} />
            {label}
          </ThumbWrapper>
        );
    }
  };

  return {
    renderFileByType,
  };
};
