import { useState, useMemo, useCallback } from 'react';
import { CommonModelItem, Categories, Tags } from '@model';
import { DataListFilter, DataListSortOrder, UseDataListProps } from './types';
import { searchItems, sortItems } from './helpers';
import { dataListSortOrderKeys } from './enums';
import {
  dataListOrderByDefault,
  dataListRowsPerPageOptions,
  dataListSortByDefault,
  filterDefaults,
} from './constants';

export const useDataList = <T extends CommonModelItem>({
  items = [],
  categories = [],
  tags = [],
  searchKeys = [],
  activeOnly,
  onSelect,
}: UseDataListProps<T>) => {
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

  const rawRows = searchItems(items, query, searchKeys);

  const rows = useMemo(() => {
    return (
      [...rawRows]
        // .filter((item) => {
        //   if (showDeleted) return true;
        //
        //   // TODO
        //
        //   return item.deleted === false;
        // })
        .filter((item) => {
          if (filter.types?.length === 0) return true;

          return item.type && filter.types?.includes(item.type);
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
        .sort(sortItems(sortBy, orderBy))
    );
  }, [rawRows, showDeleted, sortBy, orderBy, filter]);

  const typeOptions = useMemo(() => {
    const types: string[] = [];

    // We know there is type attribute to filter
    items.forEach((item) => {
      const type = item.type;

      if (!type) return;

      if (types.indexOf(type) < 0) types.push(type);
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
        newSelected.push(item.id);
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
  };
};
