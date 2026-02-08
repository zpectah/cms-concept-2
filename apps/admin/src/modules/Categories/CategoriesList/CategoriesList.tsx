import { CategoriesItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
import { useViewContext } from '../../../contexts';
import { CategoriesDetailForm } from '../CategoriesDetailForm';
import { useCategoriesList } from './useCategoriesList';

const CategoriesList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useCategoriesList();

  return (
    <>
      <DataList<CategoriesItem>
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
      <CategoriesDetailForm />
    </>
  );
};

export default CategoriesList;
