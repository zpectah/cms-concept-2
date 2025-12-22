import { FilesItem } from '@model';
import { DataList } from '../../../components';
import { useViewContext } from '../../../contexts';
import { FilesUploadForm } from '../FilesUploadForm';
import { FilesDetailForm } from '../FilesDetailForm';
import { useFilesList } from './useFilesList';

const FilesList = () => {
  const { model, rootUrl } = useViewContext();
  const { items, rowActions, selectedActions } = useFilesList();

  return (
    <>
      <DataList<FilesItem>
        view="files"
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
      <FilesUploadForm />
      <FilesDetailForm />
    </>
  );
};

export default FilesList;
