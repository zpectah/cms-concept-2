import { CommonModelItemProps, ContentModelNames } from '@model';
import { classNames } from '../../../utils';
import { FavoriteStar } from '../../button';
import { FilesViewProps } from '../types';
import { useDataListContext } from '../DataList.context';

const FilesView = <T extends CommonModelItemProps>({
  rows,
}: FilesViewProps<T>) => {
  const { model } = useDataListContext();

  if (!model) return null;

  return (
    <div id="data-list-files-view" className={classNames(`model--${model}`)}>
      ...FilesView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            <FavoriteStar
              model={model as ContentModelNames}
              id={Number(row.id)}
            />
            {row.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
