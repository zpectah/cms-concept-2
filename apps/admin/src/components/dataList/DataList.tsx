import { useMemo } from 'react';
import { CommonModelItem } from '@model';
import { classNames } from '../../utils';
import { useUserActions } from '../../hooks';
import { dataListViewKeys } from './enums';
import { DataListProps } from './types';
import { DataListContextProvider } from './DataList.context';
import { useDataList } from './useDataList';
import { useDataListPagination } from './useDataListPagination';
import DataListControls from './DataListControls';
import DataListPagination from './DataListPagination';
import { TableView, FilesView } from './view';

const DataList = <T extends CommonModelItem>({
  model,
  view = dataListViewKeys.table,
  root,
  rowActions,
  selectedActions,
  items = [],
  categories = [],
  tags = [],
  columns,
  keys,
  activeOnly,
}: DataListProps<T>) => {
  const {
    query,
    setQuery,
    rows,
    filter,
    setFilter,
    onOrderBy,
    options,
    sortBy,
    orderBy,
    showDeleted,
    onToggleShowDeleted,
  } = useDataList({
    items,
    searchKeys: keys.search,
    categories,
    tags,
    activeOnly: activeOnly ?? false,
  });
  const { rows: paginatedRows, ...pagination } = useDataListPagination({
    rows,
  });
  const { actions } = useUserActions();

  const contextValue = {
    model,
    view,
    root,
    rowActions,
    selectedActions,
    modelActions: actions,
    query,
    setQuery,
    filter,
    setFilter,
    onOrderBy: (key: string) => onOrderBy(key as keyof T),
    sortBy: sortBy as string,
    orderBy,
    options,
    keys: {
      search: keys.search as string[],
      order: keys.order as string[],
    },
    pagination,
    rowsLength: rows.length,
    activeOnly: activeOnly ?? false,
    showDeleted,
    onToggleShowDeleted,
  };

  const renderView = useMemo(() => {
    switch (view) {
      case dataListViewKeys.files:
        return <FilesView<T> rows={paginatedRows} columns={columns} />;

      case dataListViewKeys.table:
        return <TableView<T> rows={paginatedRows} columns={columns} />;
    }
  }, [view, paginatedRows, columns]);

  return (
    <DataListContextProvider value={contextValue}>
      <div
        id="data-list"
        className={classNames(`view--${view}`, `model--${model}`)}
      >
        <DataListControls />
        <div id="data-list-view-wrapper">{renderView}</div>
        <DataListPagination />
      </div>
    </DataListContextProvider>
  );
};

export default DataList;
