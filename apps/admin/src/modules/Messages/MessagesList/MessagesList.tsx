import { MessagesItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { MessagesDetailForm } from '../MessagesDetailForm';
import { useMessagesList } from './useMessagesList';

const MessagesList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useMessagesList();

  return (
    <>
      <DataList<MessagesItem>
        model={model}
        root={rootUrl}
        rowActions={rowActions}
        selectedActions={selectedActions}
        items={items}
        columns={[
          {
            name: 'sender',
            isTitle: true,
          },
          {
            name: 'type',
            renderValue: (row) => row.type,
          },
        ]}
        keys={{
          order: ['id', 'sender', 'type'],
          search: ['sender', 'type'],
        }}
      />
      <MessagesDetailForm />
    </>
  );
};

export default MessagesList;
