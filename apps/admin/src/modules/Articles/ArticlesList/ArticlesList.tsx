import { modelKeys } from '@model';
import { DataList } from '../../../components';

const ArticlesList = () => {
  return (
    <DataList
      model={modelKeys.articles}
      rowActions={{
        onDetail: (id) => null,
        onDelete: (id) => null,
        onToggle: (id) => null,
        onDeletePermanent: (id) => null,
      }}
      selectedActions={{
        onToggleSelected: (ids) => null,
        onDeleteSelected: (ids) => null,
        onDeletePermanentSelected: (ids) => null,
      }}
    />
  );
};

export default ArticlesList;
