import { useMemo } from 'react';
import { ListModelItem, ListModelItemProps } from '@model';
import { classNames } from '../../utils';
import { useUserActions } from '../../hooks';
import { dataListViewKeys } from './enums';
import { DataListProps } from './types';
import { DataListContextProvider } from './DataList.context';
import { useDataList } from './useDataList';
import { useDataListPagination } from './useDataListPagination';
import { TableView, FilesView } from './view';
import DataListControls from './DataListControls';
import DataListPagination from './DataListPagination';

const DataList = <T extends ListModelItem>({
  model,
  view = dataListViewKeys.table,
  root,
  rowActions,
  selectedActions,
  items = [],
  filter,
  columns,
  keys,
  activeOnly = false,
  onSelect,
}: DataListProps<T>) => {
  const {
    onOrderBy: originalOnOrderBy,
    sortBy: originalSortBy,
    rows,
    ...restOfDataList
  } = useDataList({
    items,
    searchKeys: keys.search,
    activeOnly,
    onSelect,
    ...filter,
  });
  const { rows: paginatedRows, ...pagination } = useDataListPagination({
    rows,
  });
  const { model: modelActions } = useUserActions(model);

  const contextValue = {
    model,
    view,
    root,
    rowActions,
    selectedActions,
    modelActions,
    onOrderBy: (key: string) => originalOnOrderBy(key as keyof T),
    sortBy: originalSortBy as string,
    pagination,
    rowsLength: rows.length,
    itemsLength: items.length,
    activeOnly,
    keys: {
      search: keys.search as string[],
      order: keys.order as string[],
    },
    ...restOfDataList,
  };

  const renderView = useMemo(() => {
    switch (view) {
      case dataListViewKeys.files:
        return (
          <FilesView<T>
            rows={paginatedRows as ListModelItemProps[]}
            columns={columns}
          />
        );

      case dataListViewKeys.table:
        return (
          <TableView<T>
            rows={paginatedRows as ListModelItemProps[]}
            columns={columns}
          />
        );
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
