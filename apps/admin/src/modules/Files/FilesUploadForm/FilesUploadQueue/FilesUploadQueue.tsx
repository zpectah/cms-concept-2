import { Box, Stack } from '@mui/material';
import { Button } from '../../../../components';
import { useFilesUploadQueue } from './useFilesUploadQueue';
import FilesUploadQueueItem from './FilesUploadQueueItem';

const FilesUploadQueue = () => {
  const { queue, inputRef, onChange, onRemove } = useFilesUploadQueue();

  return (
    <div>
      <Box
        sx={({ palette, shape }) => ({
          width: '100%',
          height: queue.length > 0 ? '25vh' : '50vh',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px dashed ${palette.divider}`,
          borderRadius: shape.borderRadius,
        })}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          onChange(event.dataTransfer.files);
        }}
      >
        <Button component="label">
          <span>Select or drop your files here...</span>
          <input
            type="file"
            multiple
            ref={inputRef}
            onChange={(event) => onChange(event.target.files)}
            hidden
          />
        </Button>
      </Box>
      <Stack
        direction="column"
        gap={2}
        sx={{
          mt: 2,
        }}
      >
        {queue.map((item, index) => (
          <FilesUploadQueueItem
            key={item.uid}
            index={index}
            onRemove={onRemove}
            {...item}
          />
        ))}
      </Stack>
    </div>
  );
};

export default FilesUploadQueue;
