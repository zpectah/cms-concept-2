import { useState, useMemo, useCallback } from 'react';
import { CommonModelItem, Categories, Tags } from '@model';
import { DataListFilter, DataListSortOrder, UseDataListProps } from './types';
import { searchItems, sortItems } from './helpers';
import { dataListSortOrderKeys } from './enums';
import { filterDefaults } from './constants';

export const useDataList = <T extends CommonModelItem>({
  items = [],
  categories = [],
  tags = [],
  searchKeys = [],
}: UseDataListProps<T>) => {
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<DataListFilter>(filterDefaults);
  const [sortBy, setSortBy] = useState<keyof T>('id');
  const [orderBy, setOrderBy] = useState<DataListSortOrder>(
    dataListSortOrderKeys.asc
  );

  const rawRows = searchItems(items, query, searchKeys);

  const rows = useMemo(() => {
    return [...rawRows]
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
      .sort(sortItems(sortBy, orderBy));
  }, [rawRows, sortBy, orderBy, filter]);

  const typeOptions = useMemo(() => {
    const types: string[] = [];

    // We know there is type attribute to filter
    rawRows.forEach((item) => {
      const type = item.type;

      if (!type) return;

      if (types.indexOf(type) < 0) types.push(type);
    });

    return types;
  }, [rawRows]);

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

  return {
    rows,
    query,
    setQuery,
    filter,
    setFilter,
    onOrderBy: orderByChangeHandler,
    options: {
      types: typeOptions,
      categories: categoriesOptions,
      tags: tagsOptions,
      pages: [5, 10, 25, 50, 75, 100], // TODO
    },
    sortBy,
    orderBy,
  };
};
