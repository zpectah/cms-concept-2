import { ArticlesItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { ArticlesDetailForm } from '../ArticlesDetailForm';

const mock_articles = [
  {
    id: 2,
    name: 'sdf-df-fds-f-sddfsd-fufu',
    type: 'event',
    categories: [5],
    tags: [5, 4],
    attachments: [],
    approved: true,
    active: true,
    deleted: false,
    created: '2025-10-25 18:08:42',
    updated: '2025-11-17 11:04:27',
  },
  {
    id: 3,
    name: 'dfgdfhdfghdf',
    type: 'default',
    categories: [2],
    tags: [5],
    attachments: [],
    approved: true,
    active: true,
    deleted: false,
    created: '2025-10-26 09:17:30',
    updated: '2025-11-24 09:15:13',
  },
  {
    id: 5,
    name: 'hmmm-oj',
    type: 'default',
    categories: [1],
    tags: [6, 7],
    attachments: [14],
    approved: true,
    active: true,
    deleted: false,
    created: '2025-10-26 10:23:00',
    updated: '2025-11-29 14:44:00',
  },
  {
    id: 8,
    name: 'clone:sdf-df-fds-f-sddfsd-fufu',
    type: 'event',
    categories: [5],
    tags: [5, 4],
    attachments: [],
    approved: true,
    active: true,
    deleted: false,
    created: '2025-11-09 09:28:18',
    updated: '2025-11-24 09:13:37',
  },
  {
    id: 10,
    name: 'clone-hmmm-oj',
    type: 'default',
    categories: [2, 3],
    tags: [6, 5, 3, 1],
    attachments: [16, 14],
    approved: true,
    active: true,
    deleted: false,
    created: '2025-11-17 10:47:25',
    updated: '2025-11-24 09:14:49',
  },
];
const mock_categories = [
  {
    id: 1,
    type: 'default',
    name: 'foo-foo',
    parent: 0,
    active: true,
    deleted: false,
    created: '2025-10-26 17:45:41',
    updated: '2025-10-26 17:45:41',
  },
  {
    id: 2,
    type: 'default',
    name: 'bar-bar-bar',
    parent: 0,
    active: true,
    deleted: false,
    created: '2025-10-26 17:46:14',
    updated: '2025-10-26 17:48:18',
  },
  {
    id: 3,
    type: 'default',
    name: 'sub-sub-eee-sdfsds',
    parent: 1,
    active: true,
    deleted: false,
    created: '2025-10-26 17:46:35',
    updated: '2025-11-08 13:34:44',
  },
  {
    id: 5,
    type: 'default',
    name: 'schuze',
    parent: 0,
    active: true,
    deleted: false,
    created: '2025-11-09 09:56:14',
    updated: '2025-11-09 09:56:14',
  },
];
const mock_tags = [
  {
    id: 1,
    type: 'default',
    color: 'pink',
    name: 'tag 1 panda',
    active: false,
    deleted: false,
    created: '2025-10-25 10:33:17',
    updated: '2025-11-17 15:18:10',
  },
  {
    id: 2,
    type: 'default',
    color: 'red',
    name: 'tag 2 red',
    active: true,
    deleted: false,
    created: '2025-10-25 10:33:17',
    updated: '2025-10-25 12:07:34',
  },
  {
    id: 3,
    type: 'default',
    color: 'blue',
    name: 'test tag',
    active: true,
    deleted: false,
    created: '2025-10-25 11:06:02',
    updated: '2025-10-25 11:06:02',
  },
  {
    id: 4,
    type: 'default',
    color: 'none',
    name: 'miuuu',
    active: true,
    deleted: false,
    created: '2025-10-25 12:07:20',
    updated: '2025-10-25 14:12:08',
  },
  {
    id: 5,
    type: 'default',
    color: 'none',
    name: 'foo',
    active: true,
    deleted: false,
    created: '2025-10-25 12:28:07',
    updated: '2025-10-25 12:28:07',
  },
  {
    id: 6,
    type: 'default',
    color: 'purple',
    name: 'fufufu',
    active: true,
    deleted: false,
    created: '2025-10-25 13:53:37',
    updated: '2025-10-25 14:13:25',
  },
  {
    id: 7,
    type: 'default',
    color: 'blue',
    name: 'boooo',
    active: true,
    deleted: false,
    created: '2025-10-25 14:00:18',
    updated: '2025-11-08 13:27:25',
  },
  {
    id: 10,
    type: 'default',
    color: 'orange',
    name: 'lalala',
    active: true,
    deleted: false,
    created: '2025-11-16 15:38:51',
    updated: '2025-11-16 15:40:50',
  },
];

const ArticlesList = () => {
  const { model, rootUrl } = useViewContext();

  return (
    <>
      <DataList<ArticlesItem>
        model={model}
        root={rootUrl}
        rowActions={{
          onDetail: (id) => console.log('on detail', id),
          onDelete: (id) => console.log('on delete', id),
          onToggle: (id) => console.log('on toggle', id),
          onDeletePermanent: (id) => console.log('on delete permanent', id),
          onClone: (id) => console.log('on clone', id),
          onApprove: (id) => console.log('on approve', id),
          // TODO DEMO
          onRead: (id) => console.log('on read', id),
        }}
        selectedActions={{
          onToggleSelected: (ids) => console.log('onToggleSelected', ids),
          onDeleteSelected: (ids) => console.log('onDeleteSelected', ids),
          onDeletePermanentSelected: (ids) =>
            console.log('onDeletePermanentSelected', ids),
          onApproveSelected: (ids) => console.log('onApproveSelected', ids),
          // TODO DEMO
          onReadSelected: (ids) => console.log('onReadSelected', ids),
        }}
        items={[...mock_articles]}
        tags={[...mock_tags]}
        categories={[...mock_categories]}
        columns={[
          {
            name: 'name',
            isTitle: true,
          },
          {
            name: 'type',
            renderValue: (row) => row.type,
          },
          {
            name: 'updated',
            renderValue: (row) => row.updated,
          },
        ]}
        keys={{
          order: ['id', 'name', 'type', 'active'],
          search: ['name', 'type'],
        }}
      />
      <ArticlesDetailForm />
    </>
  );
};

export default ArticlesList;
