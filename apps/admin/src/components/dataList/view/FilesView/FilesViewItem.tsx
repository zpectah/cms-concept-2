import { useTranslation } from 'react-i18next';
import { Paper, Grid, Stack, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getShortenedFilename } from '@common';
import { ListModelItem } from '@model';
import { FilesViewItemProps } from '../../types';
import { useDataListContext } from '../../DataList.context';
import { useFileTypeElement } from '../../../../hooks';
import { CheckboxButton } from '../../../ui';
import { useDataListView } from '../useDataListView';

const FilesViewItem = <T extends ListModelItem>({
  row,
  columns,
  isSelected,
}: FilesViewItemProps<T>) => {
  const { t } = useTranslation();
  const { onSelectRow } = useDataListContext();
  const { renderFavoriteStar, renderRowActions, onDetail } =
    useDataListView<T>();
  const { renderFileByType } = useFileTypeElement();
  const { palette } = useTheme();

  const { id, type, name, file_name } = row;

  const rowId = id as number;
  const fileName = file_name as string;

  const paperStyles = isSelected ? { borderColor: palette.primary.main } : {};

  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
      }}
    >
      <Paper variant="outlined" sx={paperStyles}>
        <Stack
          direction="column"
          gap={1}
          sx={() => ({
            p: 1,
            border: `1px solid transparent`,
            borderRadius: '.25rem',
            ...paperStyles,
          })}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={1}
          >
            <Stack>{renderFavoriteStar(rowId)}</Stack>
            <Stack>
              <Tooltip title={fileName} enterDelay={500}>
                <Typography
                  overflow="hidden"
                  variant="button"
                  onClick={() => onDetail(rowId)}
                  sx={{ cursor: 'pointer' }}
                >
                  {getShortenedFilename(fileName, 24)}
                </Typography>
              </Tooltip>
            </Stack>
          </Stack>
          <Stack
            sx={{
              height: '17.5rem',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',

              '& img': {
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '100%',
                width: 'auto',
              },
            }}
          >
            {renderFileByType(fileName, type, {
              alt: name,
              isThumbnail: true,
              disableLabel: true,
              customLabel: name,
            })}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <CheckboxButton
                onClick={() => onSelectRow(rowId)}
                size="small"
                tooltip={t('button.select')}
                isSelected={isSelected}
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              {renderRowActions(row)}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default FilesViewItem;
