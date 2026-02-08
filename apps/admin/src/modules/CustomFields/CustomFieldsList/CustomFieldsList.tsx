import { CustomFieldsItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
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
      <CustomFieldsDetailForm />
    </>
  );
};

export default CustomFieldsList;
