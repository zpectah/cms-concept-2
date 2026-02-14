import { useTranslation } from 'react-i18next';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import { Checkbox, Button } from '../../../components';
import { useSettingsLanguagesTable } from './useSettingsLanguagesTable';

const SettingsLanguagesTable = () => {
  const { t } = useTranslation(['common', 'views']);
  const {
    availableLocales,
    availableLocalesList,
    locales,
    isLocaleInstalled,
    isLocaleActive,
    isInstalling,
    isUpdating,
    isLocaleDefault,
    onLocaleToggle,
    onLocaleDefault,
    onLocaleInstall,
  } = useSettingsLanguagesTable();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="auto"></TableCell>
            <TableCell width="20%">{t('common:label.installed')}</TableCell>
            <TableCell width="20%">{t('common:label.active')}</TableCell>
            <TableCell width="20%">{t('common:label.default')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availableLocalesList.map((row) => {
            const isInstalled = isLocaleInstalled(row);
            const isActive = isLocaleActive(row);
            const isSingleRow = locales?.installed.length === 1;
            const label = availableLocales[row].label;

            return (
              <TableRow key={row}>
                <TableCell component="th" scope="row">
                  <Stack direction="row" gap={2} alignItems="center">
                    <Stack direction="row" gap={2} alignItems="center">
                      <Typography variant="button">{label}</Typography>
                      <Typography variant="caption">{row}</Typography>
                    </Stack>
                    {(isUpdating === row || isInstalling === row) && (
                      <CircularProgress size={25} />
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  {isInstalled ? (
                    <IconCheck size="1.5rem" />
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      color="success"
                      onClick={() => onLocaleInstall(row)}
                      loading={isInstalling === row}
                    >
                      {t('common:button.install')}
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={isLocaleActive(row)}
                    onChange={() => onLocaleToggle(row)}
                    disabled={!isInstalled || isSingleRow}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={isLocaleDefault(row)}
                    onChange={() => onLocaleDefault(row)}
                    disabled={!isInstalled || !isActive || isSingleRow}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SettingsLanguagesTable;
