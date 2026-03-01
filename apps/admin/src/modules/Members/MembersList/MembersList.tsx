import { MembersItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
import { useViewContext } from '../../../contexts';
import { usePersonData } from '../../../hooks';
import { MembersDetailForm } from '../MembersDetailForm';
import { useMembersList } from './useMembersList';

const MembersList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useMembersList();
  const { renderPersonAvatar } = usePersonData();

  return (
    <>
      <DataList<MembersItem>
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
                personType: 'member',
                thumbnail: true,
                size: '35px',
              }),
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
      <MembersDetailForm />
    </>
  );
};

export default MembersList;
