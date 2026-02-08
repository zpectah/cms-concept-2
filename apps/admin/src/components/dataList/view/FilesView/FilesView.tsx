import { Box, Grid } from '@mui/material';
import { ListModelItem } from '@model';
import { classNames } from '../../../../utils';
import { FilesViewProps } from '../../types';
import { useDataListContext } from '../../DataList.context';
import FilesViewItem from './FilesViewItem';

const FilesView = <T extends ListModelItem>({
  rows,
  columns,
}: FilesViewProps<T>) => {
  const { model, selected } = useDataListContext();

  return (
    <Box
      id="data-list-files-view"
      className={classNames(`model--${model}`)}
      sx={{ my: 2 }}
    >
      <Grid container spacing={2}>
        {rows.map((row) => {
          const rowId = row.id as number;
          const isSelected = selected.includes(rowId);

          return (
            <FilesViewItem
              key={row.id}
              row={row}
              columns={columns}
              isSelected={isSelected}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default FilesView;
