import { ReactNode } from 'react';
import { Categories, CommonModelItem, ModelNames, Tags } from '@model';
import { ModelActions } from '../../types';
import { dataListSortOrderKeys, dataListViewKeys } from './enums';

type DataListView = keyof typeof dataListViewKeys;

export type DataListSortOrder = keyof typeof dataListSortOrderKeys;

interface DataListRowAction {
  onDetail?: (id: number) => void;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDeletePermanent?: (id: number) => void;
  // Articles
  onClone?: (id: number) => void;
  onApprove?: (id: number) => void;
  // Messages
  onRead?: (id: string) => void;
}

interface DataListSelectedActions {
  onToggleSelected?: (ids: number[]) => void;
  onDeleteSelected?: (ids: number[]) => void;
  onDeletePermanentSelected?: (ids: number[]) => void;
  // Articles
  onApproveSelected?: (ids: number[]) => void;
  // Messages
  onReadSelected?: (ids: number[]) => void;
}

export interface DataListPagination {
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onPageFirst: () => void;
  onPagePrev: () => void;
  onPageNext: () => void;
  onPageLast: () => void;
  page: number;
  pages: number;
  perPage: number;
  disabledButton: {
    first: boolean;
    prev: boolean;
    next: boolean;
    last: boolean;
  };
}

export interface DataListFilterItems {
  categories?: Categories;
  tags?: Tags;
  types?: string[];
}

export interface DataListFilter {
  categories: number[];
  tags: number[];
  types: string[];
}

export interface UseDataListProps<T extends CommonModelItem> {
  items: T[];
  searchKeys: (keyof T)[];
  categories?: Categories;
  tags?: Tags;
}

// export interface UseDataListReturn {}

export interface UseDataListPaginationProps<T extends CommonModelItem> {
  rows: T[];
}

export type UseDataListPaginationReturn = DataListPagination;

export interface DataListColumnProps<T extends CommonModelItem> {
  name: keyof T;
  isTitle?: boolean;
  label?: string;
  renderValue?: (row: T) => ReactNode;
}

export interface DataListProps<T extends CommonModelItem> {
  model: ModelNames; // Model name
  view?: DataListView; // View type
  root: string; // Url of root list
  rowActions: DataListRowAction; // Item actions
  selectedActions: DataListSelectedActions; // Actions for selected items
  modelActions: ModelActions; // Authorized actions
  items: T[]; // Items
  categories?: Categories; // Raw categories items
  tags?: Tags; // Raw tags items
  columns: DataListColumnProps<T>[]; // Columns
  keys: {
    order: (keyof T)[]; // Keys of model for ordering
    search: (keyof T)[]; // Keys of model for search
  };
}

// interface ViewCommon {}

// export type TableViewProps = ViewCommon;

// export type FilesViewProps = ViewCommon;

export interface IDataListContext {
  model: ModelNames | 'unknown';
  view: DataListView;
  root: string;
  // Actions
  rowActions: DataListRowAction;
  selectedActions: DataListSelectedActions;
  modelActions: ModelActions;
  // Search
  query: string;
  setQuery: (query: string) => void;
  // Filter & sort
  filter: DataListFilter;
  setFilter: (filter: DataListFilter) => void;
  onOrderBy: (key: string) => void;
  // Pagination
  pagination: DataListPagination;
}
