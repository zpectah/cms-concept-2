import { CommonModelItemProps } from '@model';
import { classNames } from '../../../utils';
import { FilesViewProps } from '../types';
import { useDataListContext } from '../DataList.context';
import { useDataListView } from './useDataListView';

const FilesView = <T extends CommonModelItemProps>({
  rows,
}: FilesViewProps<T>) => {
  const { model, onSelectRow } = useDataListContext();
  const { renderFavoriteStar, renderRowActions } = useDataListView<T>();

  return (
    <div id="data-list-files-view" className={classNames(`model--${model}`)}>
      ...FilesView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            {renderFavoriteStar(row.id)}
            <button onClick={() => onSelectRow(row.id as number)}>
              select
            </button>
            {row.name}
            {renderRowActions(row)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
