import { PagesItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
import { useViewContext } from '../../../contexts';
import { PagesDetailForm } from '../PagesDetailForm';
import { usePagesList } from './usePagesList';

const PagesList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = usePagesList();

  return (
    <>
      <DataList<PagesItem>
        model={model}
        root={rootUrl}
        rowActions={rowActions}
        selectedActions={selectedActions}
        items={items}
        columns={[
          {
            name: 'name',
            isTitle: true,
          },
          {
            name: 'type',
            renderValue: (row) => <TypeValue value={row.type} prefix="model" />,
          },
          {
            name: 'updated',
            renderValue: (row) => <DateValue value={row.updated} />,
          },
        ]}
        keys={{
          order: ['id', 'name', 'type'],
          search: ['name', 'type'],
        }}
      />
      <PagesDetailForm />
    </>
  );
};

export default PagesList;
