import { MembersItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { MembersDetailForm } from '../MembersDetailForm';
import { useMembersList } from './useMembersList';

const MembersList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useMembersList();

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
          },
          {
            name: 'type',
            renderValue: (row) => row.type,
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
