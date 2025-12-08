import { classNames } from '../../../utils';
import { useDataListContext } from '../DataList.context';

const TableView = () => {
  const { model } = useDataListContext();

  return (
    <div id="DataListTableView" className={classNames(`model--${model}`)}>
      ...TableView...
    </div>
  );
};

export default TableView;
