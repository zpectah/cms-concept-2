import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { BlacklistItem } from '@model';
import {
  dataListSortOrderKeys,
  TagSelect,
  Section,
  Button,
  SearchInput,
} from '../../../components';
import { SettingsBlacklistContextProvider } from './SettingsBlacklist.context';
import { useSettingsBlacklist } from './useSettingsBlacklist';
import { useSettingsBlacklistList } from './useSettingsBlacklistList';
import { SettingsBlacklistList } from './SettingsBlacklistList';
import { SettingsBlacklistDetailForm } from './SettingsBlacklistDetailForm';

const SettingsBlacklist = () => {
  const { t } = useTranslation(['common', 'components', 'views']);
  const {
    items: rows,
    rowActions,
    selectedActions,
    detail,
  } = useSettingsBlacklist();
  const {
    items,
    sortBy,
    orderBy,
    options,
    query,
    onQuery,
    onOrderBy,
    selected,
    onSelectRow,
    onSelectAll,
  } = useSettingsBlacklistList({ items: rows });

  const context = {
    detail: detail.detail,
    setDetail: detail.onDetail,
    rowActions,
    selectedActions,
    selected,
    onSelectRow,
    onSelectAll,
  };

  return (
    <SettingsBlacklistContextProvider value={context}>
      <Section
        title={t('views:settings.blacklist.title')}
        headerSlot={
          <Button
            variant="contained"
            color="success"
            onClick={() => detail.onDetail('new')}
            startIcon={<IconPlus size="1rem" />}
          >
            {t('common:button.new.entry')}
          </Button>
        }
        contentBeforeSlot={
          <Stack direction="column" gap={2}>
            <SearchInput
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder={t('common:label.searchInTable')}
              fullWidth
            />
            <TagSelect
              value={sortBy}
              onChange={(value) => onOrderBy(value as keyof BlacklistItem)}
              options={options.orderBy}
              renderSelectedIcon={() =>
                orderBy === dataListSortOrderKeys.asc ? (
                  <IconSortAscending size="1rem" />
                ) : (
                  <IconSortDescending size="1rem" />
                )
              }
            />
          </Stack>
        }
      >
        <SettingsBlacklistList items={items} />
      </Section>
      <SettingsBlacklistDetailForm />
    </SettingsBlacklistContextProvider>
  );
};

export default SettingsBlacklist;
