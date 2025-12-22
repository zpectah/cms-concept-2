import { Link } from 'react-router-dom';
import { ListModelItem } from '@model';
import { classNames } from '../../../utils';
import { TableViewProps } from '../types';
import { useDataListContext } from '../DataList.context';
import { useDataListView } from './useDataListView';

const TableView = <T extends ListModelItem>({ rows }: TableViewProps<T>) => {
  const { model, root, onSelectRow } = useDataListContext();
  const { renderFavoriteStar, renderRowActions } = useDataListView<T>();

  return (
    <div id="data-list-table-view" className={classNames(`model--${model}`)}>
      ...TableView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            {renderFavoriteStar(row.id)}
            <button onClick={() => onSelectRow(row.id as number)}>
              select
            </button>
            {row.name}|{row.created}
            <Link to={`${root}/id/${row.id}`}>detail</Link>
            {renderRowActions(row)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
