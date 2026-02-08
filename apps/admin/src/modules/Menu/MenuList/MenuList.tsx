import { MenuItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
import { useViewContext } from '../../../contexts';
import { MenuDetailForm } from '../MenuDetailForm';
import { useMenuList } from './useMenuList';

const MenuList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useMenuList();

  return (
    <>
      <DataList<MenuItem>
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
      <MenuDetailForm />
    </>
  );
};

export default MenuList;
