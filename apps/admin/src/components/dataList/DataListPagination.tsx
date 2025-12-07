import { useDataListContext } from './DataList.context';

const DataListPagination = () => {
  const { view, model } = useDataListContext();

  return (
    <div>
      ...DataListPagination...{view}:{model}...
    </div>
  );
};

export default DataListPagination;
