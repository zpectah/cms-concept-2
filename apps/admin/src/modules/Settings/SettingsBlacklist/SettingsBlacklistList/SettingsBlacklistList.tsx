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
import {
  IconEye,
  IconEyeOff,
  IconTrash,
  IconTrashX,
  IconTrashOff,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { TypeValue, IconButtonPlus } from '../../../../components';
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
              <TableCell width="auto">{t('form:label.type')}</TableCell>
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
                      <IconButtonPlus
                        size="small"
                        onClick={() => onToggle(row.id)}
                        tooltip={t('common:button.toggle')}
                      >
                        {row.active ? (
                          <IconEye size="1.25rem" />
                        ) : (
                          <IconEyeOff size="1.25rem" />
                        )}
                      </IconButtonPlus>
                      <IconButtonPlus
                        size="small"
                        color="warning"
                        onClick={() => onDelete(row.id)}
                        tooltip={
                          row.deleted
                            ? t('common:button.undelete')
                            : t('common:button.delete')
                        }
                      >
                        {row.deleted ? (
                          <IconTrashOff size="1.25rem" />
                        ) : (
                          <IconTrash size="1.25rem" />
                        )}
                      </IconButtonPlus>
                      {row.deleted && (
                        <IconButtonPlus
                          size="small"
                          color="error"
                          onClick={() => onDeletePermanent(row.id)}
                          tooltip={t('common:button.deletePermanent')}
                        >
                          <IconTrashX size="1.25rem" />
                        </IconButtonPlus>
                      )}
                      <IconButtonPlus
                        size="small"
                        onClick={() => setDetail(row.id)}
                        tooltip={t('common:button.detail')}
                      >
                        <IconArrowUpRight size="1.25rem" />
                      </IconButtonPlus>
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
