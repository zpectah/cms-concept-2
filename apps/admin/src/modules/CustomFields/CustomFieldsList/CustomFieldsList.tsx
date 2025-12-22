import { CustomFieldsItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { CustomFieldsDetailForm } from '../CustomFieldsDetailForm';
import { useCustomFieldsList } from './useCustomFieldsList';

const CustomFieldsList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useCustomFieldsList();

  return (
    <>
      <DataList<CustomFieldsItem>
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
      <CustomFieldsDetailForm />
    </>
  );
};

export default CustomFieldsList;
