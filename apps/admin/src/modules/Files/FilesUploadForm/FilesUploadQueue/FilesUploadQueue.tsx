import { Box, Stack } from '@mui/material';
import { IconUpload } from '@tabler/icons-react';
import { Button } from '../../../../components';
import { useFilesUploadQueue } from './useFilesUploadQueue';
import FilesUploadQueueItem from './FilesUploadQueueItem';
import { useTranslation } from 'react-i18next';

const FilesUploadQueue = () => {
  const { t } = useTranslation(['common']);
  const {
    queue,
    inputRef,
    onChange,
    onRemove,
    isOver,
    onDrop,
    onDragOver,
    onDragEnter,
    onDragLeave,
  } = useFilesUploadQueue();

  return (
    <div>
      <Box
        component="div"
        sx={({ palette, shape }) => ({
          width: '100%',
          height: queue.length > 0 ? '25vh' : '50vh',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '2px',
          borderColor: palette.divider,
          borderStyle: isOver ? 'solid' : 'dashed',
          borderRadius: shape.borderRadius,
        })}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<IconUpload size="1rem" />}
        >
          <span>{t('label.selectOrDropFilesToUpload')}</span>
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
