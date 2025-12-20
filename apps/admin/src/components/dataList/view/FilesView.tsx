import { CommonModelItemProps } from '@model';
import { classNames } from '../../../utils';
import { FilesViewProps } from '../types';
import { useDataListContext } from '../DataList.context';
import { useDataListView } from './useDataListView';

const FilesView = <T extends CommonModelItemProps>({
  rows,
}: FilesViewProps<T>) => {
  const { model } = useDataListContext();
  const { renderFavoriteStar, renderRowActions } = useDataListView();

  return (
    <div id="data-list-files-view" className={classNames(`model--${model}`)}>
      ...FilesView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            {renderFavoriteStar(row.id)}
            {row.name}
            {renderRowActions(row.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
