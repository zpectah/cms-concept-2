import { createContext, useContext } from 'react';
import { IDataListContext } from './types';
import { dataListViewKeys } from './enums';

const defaultDataListContext: IDataListContext = {
  model: 'unknown',
  view: dataListViewKeys.table,
  root: '',
  // Actions
  rowActions: {},
  selectedActions: {},
  modelActions: {
    view: false,
    create: false,
    modify: false,
    delete: false,
  },
  // Search
  query: '',
  setQuery: () => null,
  // Filter
  filter: {
    categories: [],
    tags: [],
    types: [],
  },
  setFilter: () => null,
  onOrderBy: () => null,
  // Pagination
  pagination: {
    onPageChange: () => null,
    onPerPageChange: () => null,
    onPageFirst: () => null,
    onPagePrev: () => null,
    onPageNext: () => null,
    onPageLast: () => null,
    page: 1,
    pages: 1,
    perPage: 5,
    disabledButton: {
      first: true,
      prev: true,
      next: true,
      last: true,
    },
  },
};

export const DataListContext = createContext(defaultDataListContext);

export const DataListContextProvider = DataListContext.Provider;
export const DataListContextConsumer = DataListContext.Consumer;

export const useDataListContext = () =>
  useContext<IDataListContext>(DataListContext);
