import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ListModelItem } from '@model';
import { CheckboxButton } from '../../../ui';
import { classNames } from '../../../../utils';
import { TableViewProps } from '../../types';
import { useDataListContext } from '../../DataList.context';
import { useDataListView } from '../useDataListView';
import { useTranslation } from 'react-i18next';

const TableView = <T extends ListModelItem>({
  rows,
  columns,
}: TableViewProps<T>) => {
  const { t } = useTranslation(['form']);
  const { model, selected, onSelectRow } = useDataListContext();
  const { renderFavoriteStar, renderRowActions, onDetail } =
    useDataListView<T>();

  return (
    <TableContainer
      id="data-list-table-view"
      className={classNames(`model--${model}`)}
      component={Paper}
      variant="outlined"
      sx={{ my: 2 }}
    >
      <Table aria-label={`${model} list table`}>
        <TableHead>
          <TableRow>
            <TableCell width="75" />

            {columns.map((column) => {
              const labelKey = column.name as string;

              return (
                <TableCell
                  key={`table-head-column_${labelKey}`}
                  variant="head"
                  align={column.isTitle ? 'left' : 'right'}
                  width={column.isTitle ? '100%' : 'auto'}
                >
                  {t(`form:label.${labelKey}`)}
                </TableCell>
              );
            })}

            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const rowId = row.id as number;
            const isSelected = selected.includes(rowId);

            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                selected={isSelected}
              >
                <TableCell>
                  <CheckboxButton
                    isSelected={isSelected}
                    onClick={() => onSelectRow(rowId)}
                  />
                </TableCell>
                {columns.map((column) => {
                  const rawValue = (row as T)[column.name as keyof T];
                  const value = String(rawValue);

                  return (
                    <TableCell
                      key={`table-body-column_${column.name as string}`}
                      variant="body"
                      align={column.isTitle ? 'left' : 'right'}
                    >
                      {column.isTitle ? (
                        <Stack direction="row" gap={2} alignItems="center">
                          {renderFavoriteStar(row.id)}
                          <Typography
                            variant="button"
                            onClick={() => onDetail(rowId)}
                            sx={{ cursor: 'pointer' }}
                          >
                            {value}
                          </Typography>
                        </Stack>
                      ) : column.renderValue ? (
                        column.renderValue(row as T)
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
                <TableCell>{renderRowActions(row)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
