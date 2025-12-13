import { Link } from 'react-router-dom';
import { CommonModelItem } from '@model';
import { classNames } from '../../../utils';
import { TableViewProps } from '../types';
import { useDataListContext } from '../DataList.context';

const TableView = <T extends CommonModelItem>({ rows }: TableViewProps<T>) => {
  const { model, root } = useDataListContext();

  return (
    <div id="data-list-table-view" className={classNames(`model--${model}`)}>
      ...TableView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            {row.name}
            <Link to={`${root}/id/${row.id}`}>detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
