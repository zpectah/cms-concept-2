import { useTranslation } from 'react-i18next';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Stack,
} from '@mui/material';
import { Button, TypeValue } from '../../../../components';
import { useSettingsBlacklistContext } from '../SettingsBlacklist.context';
import { SettingsBlacklistListProps } from './types';

const SettingsBlacklistList = ({ items = [] }: SettingsBlacklistListProps) => {
  const { t } = useTranslation(['common', 'form']);
  const {
    setDetail,
    rowActions: { onToggle, onDelete, onDeletePermanent },
  } = useSettingsBlacklistContext();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="auto" align="center">
                {t('form:label.type')}
              </TableCell>
              <TableCell width="auto">{t('form:label.email')}</TableCell>
              <TableCell width="auto">{t('form:label.ipaddress')}</TableCell>
              <TableCell width="auto" align="right">
                {t('form:label.actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <TypeValue value={row.type} prefix="model" />
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.ipaddress}</TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      alignItems="center"
                      justifyContent="flex-end"
                      gap={1}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onToggle(row.id)}
                      >
                        {t('common:button.toggle')}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        onClick={() => onDelete(row.id)}
                      >
                        {t('common:button.delete')}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => onDeletePermanent(row.id)}
                      >
                        {t('common:button.deletePermanent')}
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setDetail(row.id)}
                      >
                        {t('common:button.detail')}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SettingsBlacklistList;
