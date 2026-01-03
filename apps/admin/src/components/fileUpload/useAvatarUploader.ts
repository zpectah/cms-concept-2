import { useEffect, useState } from 'react';
import {
  filesUploadContextKeys,
  FilesQueue,
  FilesQueueItem,
  FilesUploadRequest,
} from '@model';
import { getConfig } from '../../config';
import { useFilesQuery } from '../../query';
import { useFileUpload } from './useFileUpload';
import { UseAvatarUploaderProps } from './types';

export const useAvatarUploader = ({
  filename,
  onComplete,
  onClear,
  userUid,
  memberUid,
}: UseAvatarUploaderProps) => {
  const {
    uploads: { target, source },
  } = getConfig();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [current, setCurrent] = useState<FilesQueueItem | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | undefined>(filename);

  const { inputRef, onChange } = useFileUpload({
    onQueueChange: (queue: FilesQueue) => setCurrent(queue[0]),
    context: filesUploadContextKeys.user,
  });
  const { filesUploadMutation } = useFilesQuery({});

  const { mutate: onUpload } = filesUploadMutation;

  const requestContext = userUid
    ? filesUploadContextKeys.user
    : memberUid
    ? filesUploadContextKeys.member
    : filesUploadContextKeys.default;
  const entityUid = userUid ?? memberUid;

  const submitHandler = () => {
    if (!current?.content) return;
    if (!entityUid) return;
    if (requestContext === filesUploadContextKeys.default) return;

    setSubmitted(false);
    setSubmitting(true);

    const master = Object.assign({
      queue: [
        {
          ...current,
          name: entityUid,
          context: requestContext,
        },
      ],
      options: {
        context: requestContext,
        target,
      },
    }) as FilesUploadRequest;

    onUpload(master, {
      onSuccess: (res) => {
        onComplete?.(`${entityUid}.${current.extension}`);
        setSubmitting(false);
        setSubmitted(true);
        setCurrent(undefined);
      },
      onError: (err) => {
        setSubmitting(false);
        setSubmitted(true);
      },
    });
  };

  const cropConfirmHandler = (source: string) => {
    setCurrent({
      ...current,
      content: source,
    } as FilesQueueItem);
  };

  const resetHandler = () => {
    setCurrent(undefined);
    setImageSrc(undefined);
    if (filename) setImageSrc(`${source}${requestContext}/${filename}`);
  };

  const clearHandler = () => {
    setCurrent(undefined);
    setImageSrc(undefined);
    onClear?.();
  };

  useEffect(() => {
    if (requestContext === filesUploadContextKeys.default) return;
    if (filename) setImageSrc(`${source}${requestContext}/${filename}`);
    if (current) setImageSrc(current.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename, current, requestContext]);

  return {
    inputRef,
    requestContext,
    current,
    imageSrc,
    isSubmitting: submitting,
    isSubmitted: submitted,
    onChange,
    onSubmit: submitHandler,
    onReset: resetHandler,
    onClear: clearHandler,
    onCropConfirm: cropConfirmHandler,
  };
};
