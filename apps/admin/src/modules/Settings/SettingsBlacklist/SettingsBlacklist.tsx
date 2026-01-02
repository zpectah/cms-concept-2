import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { BlacklistItem } from '@model';
import { dataListSortOrderKeys, TagSelect } from '../../../components';
import { useSettingsBlacklist } from './useSettingsBlacklist';
import { useSettingsBlacklistList } from './useSettingsBlacklistList';

const SettingsBlacklist = () => {
  const { t } = useTranslation(['common', 'components']);
  const { items: rows, rowActions, selectedActions } = useSettingsBlacklist();
  const {
    items,
    sortBy,
    orderBy,
    options,
    selected,
    query,
    onQuery,
    onOrderBy,
    onSelectRow,
    onSelectAll,
  } = useSettingsBlacklistList({ items: rows });

  const { onCreate } = rowActions;
  const {} = selectedActions;

  // TODO: detail form

  return (
    <div>
      <div>
        <input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
        />
      </div>
      <div>
        <TagSelect
          label={t('components:dataList.label.sortOrder')}
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
      </div>
      ...SettingsBlacklist...
      <div>
        {items.map((item) => (
          <div key={item.id}>
            {item.type}|{item.email ? item.email : '-'}|
            {item.ipaddress ? item.ipaddress : '-'}
            <div>
              <button type="button">...</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsBlacklist;
