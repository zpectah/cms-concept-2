import { MenuItem } from '@model';
import { DataList } from '../../../components';
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
            renderValue: (row) => row.type,
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
