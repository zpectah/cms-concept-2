import { UsersItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
import { useViewContext } from '../../../contexts';
import { usePersonData } from '../../../hooks';
import { UsersDetailForm } from '../UsersDetailForm';
import { useUsersList } from './useUsersList';

const UsersList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useUsersList();
  const { renderPersonAvatar, getUserAccessLabelByKey } = usePersonData();

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
            renderTitleSlot: (row) =>
              renderPersonAvatar({
                firstName: row.first_name,
                lastName: row.last_name,
                email: row.email,
                avatarImage: row.avatar_image,
                avatarHash: row.avatar_hash,
                personType: 'user',
                thumbnail: true,
                size: '35px',
              }),
          },
          {
            name: 'type',
            renderValue: (row) => <TypeValue value={row.type} prefix="model" />,
          },
          {
            name: 'access_rights',
            renderValue: (row) => getUserAccessLabelByKey(row.access_rights),
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
