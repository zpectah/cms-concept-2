import { useDataListContext } from './DataList.context';

const DataListPagination = () => {
  const { view, model } = useDataListContext();

  return (
    <div id="DataListPagination">
      ...DataListPagination...{view}:{model}...
      <br />
      <span>...</span>
    </div>
  );
};

export default DataListPagination;
