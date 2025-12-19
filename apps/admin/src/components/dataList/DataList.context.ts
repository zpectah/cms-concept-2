import { createContext, useContext } from 'react';
import { IDataListContext } from './types';
import { dataListSortOrderKeys, dataListViewKeys } from './enums';
import { dataListSortByDefault } from './constants';

const defaultDataListContext: IDataListContext = {
  model: undefined,
  view: dataListViewKeys.table,
  root: '',
  rowActions: {},
  selectedActions: {},
  modelActions: {
    view: false,
    create: false,
    modify: false,
    delete: false,
    deletePermanent: false,
  },
  query: '',
  setQuery: () => null,
  filter: {
    categories: [],
    tags: [],
    types: [],
  },
  setFilter: () => null,
  onFilterReset: () => null,
  sortBy: dataListSortByDefault,
  orderBy: dataListSortOrderKeys.asc,
  onOrderBy: () => null,
  options: {
    categories: [],
    tags: [],
    types: [],
    pages: [],
  },
  keys: {
    order: [],
    search: [],
  },
  pagination: {
    onPageChange: () => null,
    onPerPageChange: () => null,
    onPageFirst: () => null,
    onPagePrev: () => null,
    onPageNext: () => null,
    onPageLast: () => null,
    page: 1,
    pages: 1,
    perPage: 1,
    disabledButton: {
      first: true,
      prev: true,
      next: true,
      last: true,
    },
  },
  rowsLength: 0,
  itemsLength: 0,
  activeOnly: false,
  showDeleted: false,
  onToggleShowDeleted: () => null,
  selected: [],
  setSelected: () => null,
  onSelectRow: () => null,
  onSelectAll: () => null,
  onDeselect: () => null,
  controlsOpen: false,
  setControlsOpen: () => null,
};

export const DataListContext = createContext(defaultDataListContext);

export const DataListContextProvider = DataListContext.Provider;
export const DataListContextConsumer = DataListContext.Consumer;

export const useDataListContext = () =>
  useContext<IDataListContext>(DataListContext);
