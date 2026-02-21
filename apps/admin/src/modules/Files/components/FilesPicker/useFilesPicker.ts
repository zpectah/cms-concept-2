import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFilesQuery } from '../../../../query';
import { FilesPickerFileType, UseFilesPickerProps } from './types';
import { FilesItem } from '@model';

function compare(a: FilesItem, b: FilesItem) {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
}

export const useFilesPicker = ({
  fileType,
  fileTypes,
  multiple,
  ignored = [],
  value,
  onChange,
}: UseFilesPickerProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const { filesQuery } = useFilesQuery({});

  const { data: files } = filesQuery;

  const isSingleValue = typeof value === 'number';

  const filteredFiles = useMemo(() => {
    if (!files) return [];

    const results = files
      ? [...files]
          .filter((item) => !item.deleted)
          .filter((item) => !ignored.includes(item.id))
          .filter((item) => {
            if (!fileType) return true;

            return item.type === fileType;
          })
          .filter((item) => {
            if (fileTypes?.length === 0) return true;

            return (
              item.type && fileTypes?.includes(item.type as FilesPickerFileType)
            );
          })
      : [];

    return results.sort(compare);
  }, [files, ignored, fileType, fileTypes]);

  const selectedValue = useMemo(() => {
    if (value === 0) return [];

    let results = [];

    if (isSingleValue) {
      results = files?.filter((item) => item.id === value) ?? [];
    } else {
      results = files?.filter((item) => value.includes(item.id)) ?? [];
    }

    return results.sort(compare) ?? [];
  }, [isSingleValue, value, files]);

  const openHandler = () => setOpen(true);

  const closeHandler = () => setOpen(false);

  const clearHandler = () => setSelected([]);

  const resetHandler = useCallback(() => {
    if (!value) {
      clearHandler();

      return;
    }

    if (isSingleValue) {
      setSelected([value]);
    } else {
      setSelected([...value]);
    }
  }, [isSingleValue, value]);

  const confirmHandler = useCallback(() => {
    const value = multiple ? selected : selected[0];

    if (multiple) {
      onChange?.(selected);
    } else {
      if (!value) {
        onChange?.(0);
      } else {
        onChange?.(value);
      }
    }

    setOpen(false);
    clearHandler();
  }, [multiple, selected, onChange]);

  const isSelectedHandler = useCallback(
    (id: number) => {
      const index = selected.indexOf(id);

      return index > -1;
    },
    [selected]
  );

  const selectHandler = useCallback(
    (id: number) => {
      if (multiple) {
        const tmpSelected = [...selected];
        const index = tmpSelected.indexOf(id);

        if (index > -1) {
          tmpSelected.splice(index, 1);
        } else {
          tmpSelected.push(id);
        }

        setSelected(tmpSelected);
      } else {
        if (selected[0] === id) {
          setSelected([]);
        } else {
          setSelected([id]);
        }
      }
    },
    [selected, multiple]
  );

  useEffect(() => resetHandler(), [resetHandler, value]);

  return {
    files: filteredFiles,
    selectedValue,
    open,
    selected,
    onOpen: openHandler,
    onClose: closeHandler,
    onSelect: selectHandler,
    isRowSelected: isSelectedHandler,
    onConfirm: confirmHandler,
    onReset: resetHandler,
    onClear: clearHandler,
  };
};
