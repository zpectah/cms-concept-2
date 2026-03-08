import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Stack, Typography, Paper, Box, Grid } from '@mui/material';
import { formatBytes, getBase64Size } from '@common';
import { getConfig } from '../../../../config';
import { getOptionValue } from '../../../../helpers';
import {
  Button,
  ImageCropper,
  InputPlusField,
  CheckboxField,
} from '../../../../components';
import { useFileTypeElement } from '../../../../hooks';
import { IFilesUploadForm } from '../types';
import { FilesUploadQueueItemProps } from './types';

const FilesUploadQueueItem = ({
  index,
  name,
  size,
  type,
  extension,
  mime,
  content,
  onRemove,
}: FilesUploadQueueItemProps) => {
  const {
    cms: { features },
  } = getConfig();

  const { t } = useTranslation();
  const { setValue } = useFormContext<IFilesUploadForm>();
  const { renderFileByType } = useFileTypeElement();

  const fileElement = renderFileByType(content, type, {
    alt: name,
    disablePathPrefix: true,
    disableLabel: true,
  });

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
      }}
    >
      <Box>
        <Box sx={{ textAlign: 'center' }}>{fileElement}</Box>
        <Box>
          <Grid container spacing={1} sx={{ pt: 1 }}>
            <InputPlusField
              name={`queue.${index}.name`}
              label="File name"
              layout="vertical"
              isFullWidth
              endAdornment={
                <Typography color="textDisabled" fontFamily="inherit">
                  .{extension}
                </Typography>
              }
            />
            <CheckboxField
              name={`queue.${index}.explicit`}
              label=""
              fieldLabel="Explicit"
              layout="vertical"
              isHidden={!features['content.explicit']}
            />

            <Grid size={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="textDisabled">
                  {getOptionValue(type)} | {mime} | {formatBytes(size)}
                </Typography>
              </Box>
            </Grid>

            <Grid size={12}>
              <Stack direction="row" gap={1}>
                <Button
                  onClick={() => onRemove(index)}
                  color="warning"
                  variant="outlined"
                  size="small"
                >
                  {t('button.removeFromQueue')}
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilesUploadQueueItem;
