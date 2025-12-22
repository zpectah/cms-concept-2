import { CategoriesItem } from '@model';
import { DataList } from '../../../components';
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
            renderValue: (row) => row.type,
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
