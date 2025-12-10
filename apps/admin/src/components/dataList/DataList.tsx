import { useMemo } from 'react';
import { CommonModelItem } from '@model';
import { classNames } from '../../utils';
import { dataListViewKeys } from './enums';
import { DataListProps } from './types';
import { DataListContextProvider } from './DataList.context';
import { TableView, FilesView } from './view';
import { useDataList } from './useDataList';
import { useDataListPagination } from './useDataListPagination';
import DataListControls from './DataListControls';
import DataListPagination from './DataListPagination';

const DataList = <T extends CommonModelItem>({
  model,
  view = dataListViewKeys.table,
  root,
  rowActions,
  selectedActions,
  modelActions,
  items = [],
  categories = [],
  tags = [],
  columns,
  keys,
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
  } = useDataList({
    items,
    searchKeys: keys.search,
    categories,
    tags,
  });
  const { rows: paginatedRows, ...pagination } = useDataListPagination({
    rows,
  });

  const contextValue = {
    model,
    view,
    root,
    rowActions,
    selectedActions,
    modelActions,
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
        id="DataList"
        className={classNames(`view--${view}`, `model--${model}`)}
      >
        <DataListControls />
        <div id="DataListWrapper">{renderView}</div>
        <DataListPagination />
      </div>
    </DataListContextProvider>
  );
};

export default DataList;
