import { useState, useMemo, useCallback } from 'react';
import { Categories, Tags, ListModelItem } from '@model';
import { getConfig } from '../../config';
import { DataListFilter, DataListSortOrder, UseDataListProps } from './types';
import { searchItems, sortItems } from './helpers';
import { dataListSortOrderKeys } from './enums';
import {
  dataListOrderByDefault,
  dataListRowsPerPageOptions,
  dataListSortByDefault,
  filterDefaults,
} from './constants';

export const useDataList = <T extends ListModelItem>({
  items = [],
  categories = [],
  tags = [],
  searchKeys = [],
  activeOnly,
  onSelect,
}: UseDataListProps<T>) => {
  const {
    cms: { features },
  } = getConfig();

  const [controlsOpen, setControlsOpen] = useState<boolean>(false);
  const [showDeleted, setShowDeleted] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<DataListFilter>(filterDefaults);
  const [sortBy, setSortBy] = useState<keyof T>(
    dataListSortByDefault as keyof T
  );
  const [orderBy, setOrderBy] = useState<DataListSortOrder>(
    dataListOrderByDefault
  );
  const [showExplicit, setShowExplicit] = useState<boolean>(true);

  const rawRows = searchItems(items, query, searchKeys);

  const isExplicitAttribute = useMemo(() => {
    if (!features['content.explicit']) return false;

    return [...rawRows].some(
      (item: T & { explicit?: boolean }) => !!item.explicit
    );
  }, [rawRows, features]);

  const rows = useMemo(() => {
    return [...rawRows]
      .filter((item) => {
        if (showDeleted) return true;

        return item?.deleted === false;
      })
      .filter((item) => {
        if (filter.types?.length === 0) return true;

        return item.type && filter.types?.includes(item.type as string);
      })
      .filter((item) => {
        if (filter.categories?.length === 0) return true;

        const categories =
          (item as T & { categories?: number[] }).categories ?? [];

        return categories.some((c) => filter.categories?.includes(c));
      })
      .filter((item) => {
        if (filter.tags?.length === 0) return true;

        const tags = (item as T & { tags?: number[] }).tags ?? [];

        return tags.some((t) => filter.tags?.includes(t));
      })
      .filter((item: T & { explicit?: boolean }) => {
        if (!isExplicitAttribute) return true;
        if (showExplicit) return true;

        return !item.explicit;
      })
      .sort(sortItems(sortBy, orderBy));
  }, [
    rawRows,
    showDeleted,
    sortBy,
    orderBy,
    filter,
    isExplicitAttribute,
    showExplicit,
  ]);

  const typeOptions = useMemo(() => {
    const types: string[] = [];

    // We know there is type attribute to filter
    items.forEach((item) => {
      const type = item.type;

      if (!type) return;

      if (types.indexOf(type as string) < 0) types.push(type as string);
    });

    return types;
  }, [items]);

  const categoriesOptions = useMemo(() => {
    const ids: number[] = [];
    const objects: Categories = [];

    if (!categories) return [];

    // We know there is categories attribute to filter
    items.forEach((item) => {
      const value = (item as T & { categories: number[] })?.categories;

      if (value && value.length > 0) {
        value.forEach((id) => {
          ids.push(id);
        });
      }
    });

    // We iterate sorted ids to find category object
    [...new Set(ids)].forEach((id) => {
      const object = categories.find((item) => item.id === id);

      if (object) objects.push(object);
    });

    return objects;
  }, [items, categories]);

  const tagsOptions = useMemo(() => {
    const ids: number[] = [];
    const objects: Tags = [];

    if (!tags) return [];

    // We know there is tags attribute to filter
    items.forEach((item) => {
      const value = (item as T & { tags: number[] })?.tags;

      if (value && value.length > 0) {
        value.forEach((id) => {
          ids.push(id);
        });
      }
    });

    // We iterate sorted ids to find tag object
    [...new Set(ids)].forEach((id) => {
      const object = tags.find((item) => item.id === id);

      if (object) objects.push(object);
    });

    return objects;
  }, [items, tags]);

  const orderByChangeHandler = useCallback(
    (key: keyof T) => {
      setSortBy(key);
      if (key === sortBy) {
        const newOrderBy =
          orderBy === dataListSortOrderKeys.asc
            ? dataListSortOrderKeys.desc
            : dataListSortOrderKeys.asc;

        setOrderBy(newOrderBy);
      } else {
        setOrderBy(dataListSortOrderKeys.desc);
      }
    },
    [orderBy, sortBy]
  );

  const selectRowHandler = useCallback(
    (id: number) => {
      const newSelected: number[] = [...selected];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setSelected(newSelected);
      onSelect?.(newSelected);
    },
    [selected, onSelect]
  );

  const selectAllHandler = useCallback(() => {
    let newSelected: number[] = [];

    if (selected.length >= 0) {
      newSelected = [];
      rows.forEach((item) => {
        newSelected.push(item.id as number);
      });
    }

    if (selected.length === rows.length) newSelected = [];

    setSelected(newSelected);
    onSelect?.(newSelected);
  }, [rows, selected, onSelect]);

  const showDeletedHandler = useCallback(() => {
    if (activeOnly) return;

    setShowDeleted(!showDeleted);
  }, [activeOnly, showDeleted]);

  return {
    rows,
    query,
    setQuery,
    filter,
    setFilter,
    onFilterReset: () => setFilter(Object.assign(filterDefaults)),
    onOrderBy: orderByChangeHandler,
    options: {
      types: typeOptions,
      categories: categoriesOptions,
      tags: tagsOptions,
      pages: dataListRowsPerPageOptions,
      showExplicit,
    },
    sortBy,
    orderBy,
    showDeleted,
    onToggleShowDeleted: showDeletedHandler,
    selected,
    setSelected,
    onSelectRow: selectRowHandler,
    onSelectAll: selectAllHandler,
    onDeselect: () => setSelected([]),
    controlsOpen,
    setControlsOpen,
    isExplicitAttribute,
    setShowExplicit,
  };
};
