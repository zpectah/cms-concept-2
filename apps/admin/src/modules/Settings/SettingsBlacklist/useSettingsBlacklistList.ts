import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Blacklist, BlacklistItem } from '@model';
import {
  searchItems,
  sortItems,
  dataListSortOrderKeys,
  DataListSortOrder,
  OptionItem,
} from '../../../components';

interface UseSettingsBlacklistListProps {
  items?: Blacklist;
}

const orderKeys: (keyof BlacklistItem)[] = ['id', 'ipaddress', 'email', 'type'];
const searchKeys: (keyof BlacklistItem)[] = ['ipaddress', 'email', 'type'];

export const useSettingsBlacklistList = ({
  items = [],
}: UseSettingsBlacklistListProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [query, setQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<keyof BlacklistItem>('id');
  const [orderBy, setOrderBy] = useState<DataListSortOrder>(
    dataListSortOrderKeys.desc
  );

  const { t } = useTranslation(['form']);

  const rawRows = searchItems(items, query, searchKeys);

  const rows: Blacklist = useMemo(() => {
    return [...rawRows].sort(sortItems(sortBy, orderBy));
  }, [rawRows, orderBy, sortBy]);

  const orderByChangeHandler = useCallback(
    (key: keyof BlacklistItem) => {
      setSortBy(key);
      if (key === sortBy) {
        const newOrderBy =
          orderBy === dataListSortOrderKeys.asc
            ? dataListSortOrderKeys.desc
            : dataListSortOrderKeys.asc;

        setOrderBy(newOrderBy);
      } else {
        setOrderBy(dataListSortOrderKeys.desc);
      }
    },
    [orderBy, sortBy]
  );

  const selectRowHandler = useCallback(
    (id: number) => {
      const newSelected: number[] = [...selected];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const selectAllHandler = useCallback(() => {
    let newSelected: number[] = [];

    if (selected.length >= 0) {
      newSelected = [];
      rows.forEach((item) => {
        newSelected.push(item.id as number);
      });
    }

    if (selected.length === rows.length) newSelected = [];

    setSelected(newSelected);
  }, [rows, selected]);

  const orderByOptionsList = useMemo(() => {
    const optionsList: OptionItem<string>[] = [];

    orderKeys?.forEach((item) => {
      optionsList.push({
        id: item,
        value: item,
        label: t(`form:label.${item}`),
      });
    });

    return optionsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderKeys]);

  return {
    items: rows,
    orderBy,
    sortBy,
    options: {
      orderBy: orderByOptionsList,
    },
    selected,
    query,
    onQuery: setQuery,
    onOrderBy: orderByChangeHandler,
    onSelectRow: selectRowHandler,
    onSelectAll: selectAllHandler,
    onDeselect: () => setSelected([]),
  };
};
