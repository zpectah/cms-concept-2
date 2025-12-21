import { dataListSortOrderKeys } from './enums';

export const filterDefaults = {
  categories: [],
  tags: [],
  types: [],
};

export const dataListRowsPerPageDefault = 25;
export const dataListRowsPerPageOptions = [5, 10, 25, 50, 75, 100];

export const dataListSortByDefault = 'id';
export const dataListOrderByDefault = dataListSortOrderKeys.asc;

export const dataListIconSizeDefault = '1.25rem';
