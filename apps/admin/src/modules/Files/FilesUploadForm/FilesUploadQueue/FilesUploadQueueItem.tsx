import { useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';
import { getBase64Size } from '@common';
import { Button, ImageCropper } from '../../../../components';
import { IFilesUploadForm } from '../types';
import { FilesUploadQueueItemProps } from './types';

const FilesUploadQueueItem = ({
  index,
  name,
  size,
  type,
  content,
  onRemove,
}: FilesUploadQueueItemProps) => {
  const { register, setValue } = useFormContext<IFilesUploadForm>();

  return (
    <div>
      <div>
        {type === 'image' && (
          <img
            src={content}
            alt={name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <div>
          <div>
            <input type="text" {...register(`queue.${index}.name`)} />
            <div>
              {name}|{size}
            </div>
          </div>
          <div>
            <Stack direction="row" gap={1}>
              <Button
                onClick={() => onRemove(index)}
                variant="outlined"
                size="small"
              >
                Remove
              </Button>
              <ImageCropper
                hidden={type !== 'image'}
                input={{
                  source: content,
                }}
                onConfirm={(source) => {
                  setValue(`queue.${index}.content`, source);
                  setValue(`queue.${index}.size`, getBase64Size(source));
                }}
                buttonProps={{
                  variant: 'outlined',
                  size: 'small',
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesUploadQueueItem;
