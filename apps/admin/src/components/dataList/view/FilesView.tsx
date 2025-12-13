import { CommonModelItem } from '@model';
import { classNames } from '../../../utils';
import { FilesViewProps } from '../types';
import { useDataListContext } from '../DataList.context';

const FilesView = <T extends CommonModelItem>({ rows }: FilesViewProps<T>) => {
  const { model } = useDataListContext();

  return (
    <div id="data-list-files-view" className={classNames(`model--${model}`)}>
      ...FilesView...
      <div>
        {rows.map((row) => (
          <div key={row.id}>{row.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
