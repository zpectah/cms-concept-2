import { useTheme } from '@mui/material/styles';
import { Grid, Paper, Stack } from '@mui/material';
import { useFileTypeElement } from '../../../../hooks';
import { FilesPickerListProps } from './types';
import { getShortenedFilename } from '@common';

const FilesPickerList = ({
  items = [],
  onSelect,
  isRowSelected,
}: FilesPickerListProps) => {
  const { renderFileByType } = useFileTypeElement();
  const { palette } = useTheme();

  return (
    <Grid>
      <Grid container spacing={1}>
        {items.map(({ id, file_name, type, name }) => {
          const rowId = id as number;
          const fileName = file_name as string;

          const paperStyles = isRowSelected?.(rowId)
            ? { borderColor: palette.primary.main }
            : {};

          return (
            <Grid
              key={rowId}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
              onClick={() => onSelect?.(rowId)}
            >
              <Paper variant="outlined" sx={paperStyles}>
                <Stack
                  direction="column"
                  gap={1}
                  sx={() => ({
                    p: 0,
                    border: `1px solid transparent`,
                    borderRadius: '.25rem',
                    ...paperStyles,
                  })}
                >
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
                      customLabel: getShortenedFilename(file_name, 24),
                    })}
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default FilesPickerList;
