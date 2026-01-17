import { useTranslation } from 'react-i18next';
import { styled, Box, Grid, Paper, Stack } from '@mui/material';
import { IconArchive } from '@tabler/icons-react';
import { filesTypeKeys } from '@model';
import { getConfig } from '../../../config';
import {
  CheckboxField,
  DetailDrawer,
  ImageViewer,
  PdfViewer,
  AudioPlayer,
  VideoPlayer,
} from '../../../components';
import { SPACING } from '../../../constants';
import { IFilesDetailForm } from './types';
import { useFilesDetailForm } from './useFilesDetailForm';

const ThumbWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

const FilesDetailForm = () => {
  const {
    uploads: { source },
  } = getConfig();

  const { t } = useTranslation(['form']);
  const { id, title, form, onSubmit, onClose, onReset, onDelete, values } =
    useFilesDetailForm();

  return (
    <DetailDrawer<IFilesDetailForm>
      id={id}
      open={!!id && id !== 'new'}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <Grid container spacing={SPACING.form}>
        <Grid size={12}>
          <Stack direction="column" gap={2}>
            <Paper
              sx={() => ({
                pb: 0,
                p: 0.75,
                width: '100%',
                textAlign: 'center',
                lineHeight: 0,
              })}
            >
              {values.type === filesTypeKeys.image && (
                <ImageViewer src={values.file_name} alt={values.name} />
              )}
              {values.type === filesTypeKeys.audio && (
                <ThumbWrapper>
                  {/* TODO: ID3 thumb - if exist */}
                  <AudioPlayer source={`${source}audio/${values.file_name}`} />
                </ThumbWrapper>
              )}
              {values.type === filesTypeKeys.video && (
                <ThumbWrapper>
                  <VideoPlayer source={`${source}video/${values.file_name}`} />
                </ThumbWrapper>
              )}
              {values.type === filesTypeKeys.document && (
                <>
                  {values.file_ext === 'pdf' ? (
                    <PdfViewer
                      source={`${source}document/${values.file_name}`}
                    />
                  ) : (
                    <ThumbWrapper>
                      <IconArchive size="2.5rem" />
                      <span>{values.file_name}</span>
                    </ThumbWrapper>
                  )}
                </>
              )}
              {values.type === filesTypeKeys.archive && (
                <ThumbWrapper>
                  <IconArchive size="2.5rem" />
                  <span>{values.file_name}</span>
                </ThumbWrapper>
              )}
            </Paper>
            <Box>TODO...download button...</Box>
          </Stack>
        </Grid>
        <Grid container size={12} spacing={0}>
          <CheckboxField
            name="explicit"
            label=""
            fieldLabel={t('form:label.explicit')}
            layout="vertical"
          />
          <CheckboxField
            name="active"
            label=""
            fieldLabel={t('form:label.active')}
            layout="vertical"
          />
        </Grid>
      </Grid>
    </DetailDrawer>
  );
};

export default FilesDetailForm;
