import { Link } from 'react-router-dom';
import { CommonModelItemProps, ContentModelNames } from '@model';
import { classNames } from '../../../utils';
import { FavoriteStar } from '../../button';
import { TableViewProps } from '../types';
import { useDataListContext } from '../DataList.context';

const TableView = <T extends CommonModelItemProps>({
  rows,
}: TableViewProps<T>) => {
  const { model, root } = useDataListContext();

  return (
    <div id="data-list-table-view" className={classNames(`model--${model}`)}>
      ...TableView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            <FavoriteStar
              model={model as ContentModelNames}
              id={Number(row.id)}
            />
            {row.name}
            <Link to={`${root}/id/${row.id}`}>detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
