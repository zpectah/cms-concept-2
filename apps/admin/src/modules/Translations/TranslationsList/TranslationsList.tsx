import { TranslationsItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { TranslationsDetailForm } from '../TranslationsDetailForm';
import { useTranslationsList } from './useTranslationsList';

const TranslationsList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useTranslationsList();

  return (
    <>
      <DataList<TranslationsItem>
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
      <TranslationsDetailForm />
    </>
  );
};

export default TranslationsList;
