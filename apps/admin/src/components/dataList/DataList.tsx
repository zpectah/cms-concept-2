import { classNames } from '../../utils';
import { dataListViewKeys } from './enums';
import { DataListProps } from './types';
import { DataListContextProvider } from './DataList.context';
import { TableView, FilesView } from './view';
import DataListControls from './DataListControls';
import DataListPagination from './DataListPagination';

const DataList = ({ model, view = dataListViewKeys.table }: DataListProps) => {
  const contextValue = {
    model,
    view,
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
        <DataListPagination />
      </div>
    </DataListContextProvider>
  );
};

export default DataList;
