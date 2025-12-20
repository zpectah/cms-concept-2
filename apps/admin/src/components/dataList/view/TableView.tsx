import { Link } from 'react-router-dom';
import { CommonModelItemProps } from '@model';
import { classNames } from '../../../utils';
import { TableViewProps } from '../types';
import { useDataListContext } from '../DataList.context';
import { useDataListView } from './useDataListView';

const TableView = <T extends CommonModelItemProps>({
  rows,
}: TableViewProps<T>) => {
  const { model, root } = useDataListContext();
  const { renderFavoriteStar, renderRowActions } = useDataListView();

  return (
    <div id="data-list-table-view" className={classNames(`model--${model}`)}>
      ...TableView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            {renderFavoriteStar(row.id)}
            {row.name}
            <Link to={`${root}/id/${row.id}`}>detail</Link>
            {renderRowActions(row.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
