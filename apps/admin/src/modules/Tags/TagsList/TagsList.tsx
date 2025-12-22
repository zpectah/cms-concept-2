import { TagsItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { TagsDetailForm } from '../TagsDetailForm';
import { useTagsList } from './useTagsList';

const TagsList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useTagsList();

  return (
    <>
      <DataList<TagsItem>
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
      <TagsDetailForm />
    </>
  );
};

export default TagsList;
