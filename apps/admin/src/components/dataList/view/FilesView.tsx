import { FilesViewProps } from '../types';
import { classNames } from '../../../utils';
import { useDataListContext } from '../DataList.context';

const FilesView = ({ test }: FilesViewProps) => {
  const { model } = useDataListContext();

  return (
    <div id="DataListFilesView" className={classNames(`model--${model}`)}>
      ...FilesView...
    </div>
  );
};

export default FilesView;
