import { CommonModelItem } from '@model';
import { classNames } from '../../utils';
import { dataListViewKeys } from './enums';
import { DataListProps } from './types';
import { DataListContextProvider } from './DataList.context';
import { TableView, FilesView } from './view';
import DataListControls from './DataListControls';
import DataListPagination from './DataListPagination';
import { useDataList } from './useDataList';
import { useDataListPagination } from './useDataListPagination';

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
  const { query, setQuery, rows, filter, setFilter, onOrderBy } = useDataList({
    items,
    searchKeys: keys.search,
    categories,
    tags,
  });
  const { ...pagination } = useDataListPagination({ rows });

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
    pagination,
  };

  const renderView = () => {
    switch (view) {
      case dataListViewKeys.files:
        return <FilesView />;

      case dataListViewKeys.table:
      default:
        return <TableView />;
    }
  };

  return (
    <DataListContextProvider value={contextValue}>
      <div
        id="DataList"
        className={classNames(`view--${view}`, `model--${model}`)}
      >
        <DataListControls />
        <div>{renderView()}</div>
        <div>
          <pre>
            <code>{JSON.stringify(rows, null, 2)}</code>
          </pre>
        </div>
        <DataListPagination />
      </div>
    </DataListContextProvider>
  );
};

export default DataList;
