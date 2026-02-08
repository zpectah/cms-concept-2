import { MembersItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
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
