import { CommonModelItem } from '@model';
import { classNames } from '../../../utils';
import { TableViewProps } from '../types';
import { useDataListContext } from '../DataList.context';

const TableView = <T extends CommonModelItem>({ rows }: TableViewProps<T>) => {
  const { model } = useDataListContext();

  return (
    <div id="DataListTableView" className={classNames(`model--${model}`)}>
      ...TableView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>{row.name}</div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
