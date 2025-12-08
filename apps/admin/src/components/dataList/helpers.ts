import { CommonModelItem } from '@model';
import { dataListSortOrderKeys } from './enums';
import { DataListSortOrder } from './types';

export function searchItems<T extends CommonModelItem>(
  items: T[],
  query: string,
  keys: (keyof T)[],
  minLength = 3
): T[] {
  const q = query.toLowerCase().trim();

  if (!q || q.length < minLength) return items;

  return items.filter((item) =>
    keys.some((key) => {
      const value = item[key];

      if (value == null) return false;

      return String(value).toLowerCase().includes(q);
    })
  );
}

export function sortItems<T extends CommonModelItem>(
  key: keyof T,
  order: DataListSortOrder = dataListSortOrderKeys.desc
) {
  return (a: T, b: T) => {
    const valA = a[key];
    const valB = b[key];

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === dataListSortOrderKeys.asc ? valA - valB : valB - valA;
    }

    if (typeof valA === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valA)) {
      const dateA = new Date(valA).getTime();
      const dateB = new Date(valB as string).getTime();
      return order === dataListSortOrderKeys.asc
        ? dateA - dateB
        : dateB - dateA;
    }

    return order === dataListSortOrderKeys.asc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  };
}
