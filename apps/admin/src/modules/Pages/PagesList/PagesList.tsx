import { PagesItem } from '@model';
import { DataList } from '../../../components';
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
            renderValue: (row) => row.type,
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
