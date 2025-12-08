import { useDataListContext } from './DataList.context';

const DataListControls = () => {
  const { view, model, query, setQuery, filter } = useDataListContext();

  return (
    <div id="DataListControls">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      ...DataListControls...{view}:{model}...
      <div>
        <pre>
          <code>{JSON.stringify(filter, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default DataListControls;
