import { TranslationsItem } from '@model';
import { DataList, DateValue, TypeValue } from '../../../components';
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
            renderValue: (row) => <TypeValue value={row.type} prefix="model" />,
          },
          {
            name: 'updated',
            renderValue: (row) => <DateValue value={row.updated} />,
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
