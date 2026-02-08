import { useTranslation } from 'react-i18next';
import { Box, Grid, Paper, Stack } from '@mui/material';
import { getConfig } from '../../../config';
import {
  CheckboxField,
  DetailDrawer,
  DownloadButton,
} from '../../../components';
import { SPACING } from '../../../constants';
import { useFileTypeElement } from '../../../hooks';
import { IFilesDetailForm } from './types';
import { useFilesDetailForm } from './useFilesDetailForm';

const FilesDetailForm = () => {
  const {
    uploads: { source },
  } = getConfig();

  const { t } = useTranslation(['form']);
  const {
    id,
    title,
    form,
    formId,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    values,
  } = useFilesDetailForm();
  const { renderFileByType } = useFileTypeElement();

  const fileElement = renderFileByType(values.file_name, values.type, {
    alt: values.name,
  });

  return (
    <DetailDrawer<IFilesDetailForm>
      formId={formId}
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
              <Box sx={{ my: 2 }}>
                <DownloadButton
                  source={`${source}${values.type}/${values.file_name}`}
                  filename={`${values.name}.${values.file_ext}`}
                />
              </Box>
              {fileElement}
            </Paper>
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
