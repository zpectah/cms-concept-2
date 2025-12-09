import { createContext, useContext } from 'react';
import { IDataListContext } from './types';
import { dataListViewKeys } from './enums';

const defaultDataListContext: IDataListContext = {
  model: 'unknown',
  view: dataListViewKeys.table,
  root: '',
  rowActions: {},
  selectedActions: {},
  modelActions: {
    view: false,
    create: false,
    modify: false,
    delete: false,
  },
  query: '',
  setQuery: () => null,
  filter: {
    categories: [],
    tags: [],
    types: [],
  },
  setFilter: () => null,
  onOrderBy: () => null,
  options: {
    categories: [],
    tags: [],
    types: [],
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
};

export const DataListContext = createContext(defaultDataListContext);

export const DataListContextProvider = DataListContext.Provider;
export const DataListContextConsumer = DataListContext.Consumer;

export const useDataListContext = () =>
  useContext<IDataListContext>(DataListContext);
