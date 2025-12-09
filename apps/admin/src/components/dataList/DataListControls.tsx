import { useDataListContext } from './DataList.context';
import { Input, InputSelect } from '../ui';
import { useState } from 'react';

const DataListControls = () => {
  const { query, setQuery, options, filter, pagination } = useDataListContext();

  const [test, setTest] = useState<number[]>([]);

  return (
    <div id="DataListControls">
      <div>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search in list"
        />
      </div>
      <div>
        rows per page
        <InputSelect
          value={pagination.perPage}
          onChange={(value) => pagination.onPerPageChange(value as number)}
          options={[
            {
              id: '1',
              value: 1,
              label: '1',
            },
            {
              id: '5',
              value: 5,
              label: '5',
            },
            {
              id: '10',
              value: 10,
              label: '10',
            },
            {
              id: '15',
              value: 15,
              label: '15',
            },
          ]}
          placeholder="Vyberte počet řádků na stránku"
        />
        <br />
        <br />
        <InputSelect
          value={test}
          onChange={(value) => setTest(value as number[])}
          options={[
            {
              id: '1',
              value: 1,
              label: '1',
            },
            {
              id: '5',
              value: 5,
              label: '5',
            },
            {
              id: '10',
              value: 10,
              label: '10',
            },
            {
              id: '15',
              value: 15,
              label: '15',
            },
            {
              id: '25',
              value: 25,
              label: '25',
              disabled: true,
            },
          ]}
          placeholder="Vyberte počet řádků na stránku ..."
          multiple
        />
      </div>
      <div>sort & order</div>
      <div>filter: type</div>
      <div>filter: categories</div>
      <div>filter: tags</div>
    </div>
  );
};

export default DataListControls;
