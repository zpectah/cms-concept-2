import { UsersItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
import { useViewContext } from '../../../contexts';
import { UsersDetailForm } from '../UsersDetailForm';
import { useUsersList } from './useUsersList';

const UsersList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useUsersList();

  return (
    <>
      <DataList<UsersItem>
        model={model}
        root={rootUrl}
        rowActions={rowActions}
        selectedActions={selectedActions}
        items={items}
        columns={[
          {
            name: 'email',
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
          order: ['id', 'email', 'type'],
          search: ['email', 'type'],
        }}
      />
      <UsersDetailForm />
    </>
  );
};

export default UsersList;
