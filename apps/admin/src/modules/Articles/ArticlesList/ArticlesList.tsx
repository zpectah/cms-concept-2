import { ArticlesItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { ArticlesDetailForm } from '../ArticlesDetailForm';
import { useArticlesList } from './useArticlesList';

const ArticlesList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, filter, rowActions, selectedActions } = useArticlesList();

  return (
    <>
      <DataList<ArticlesItem>
        model={model}
        root={rootUrl}
        rowActions={rowActions}
        selectedActions={selectedActions}
        items={items}
        filter={filter}
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
