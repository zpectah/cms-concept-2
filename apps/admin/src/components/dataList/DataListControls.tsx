import { useDataListContext } from './DataList.context';

const DataListControls = () => {
  const { view, model } = useDataListContext();

  return (
    <div>
      ...DataListControls...{view}:{model}...
    </div>
  );
};

export default DataListControls;
