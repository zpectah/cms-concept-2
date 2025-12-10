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

export interface UseDataListPaginationProps<T extends CommonModelItem> {
  rows: T[];
}

export type UseDataListPaginationReturn<T extends CommonModelItem> =
  DataListPagination & {
    rows: T[];
  };

export interface DataListColumnProps<T extends CommonModelItem> {
  name: keyof T;
  isTitle?: boolean;
  label?: string;
  renderValue?: (row: T) => ReactNode;
}

export interface DataListProps<T extends CommonModelItem> {
  /** Model name */
  model: ModelNames;
  /** View type */
  view?: DataListView;
  /** Url of root list */
  root: string;
  /** Row item actions */
  rowActions: DataListRowAction;
  /** Actions for selected items */
  selectedActions: DataListSelectedActions;
  /** Authorized actions */
  modelActions: ModelActions;
  /** Items by model type */
  items: T[];
  /** Raw categories items for filtering */
  categories?: Categories;
  /** Raw tags items for filtering */
  tags?: Tags;
  /** Columns */
  columns: DataListColumnProps<T>[];
  /** Keys */
  keys: {
    /** Order keys for list ordering */
    order: (keyof T)[];
    /** Search keys for list filtering */
    search: (keyof T)[];
  };
}

interface ViewCommon<T extends CommonModelItem> {
  rows: T[];
  columns: DataListColumnProps<T>[];
}

export type TableViewProps<T extends CommonModelItem> = ViewCommon<T>;

export type FilesViewProps<T extends CommonModelItem> = ViewCommon<T>;

export interface IDataListContext {
  model: ModelNames | 'unknown';
  view: DataListView;
  root: string;
  rowActions: DataListRowAction;
  selectedActions: DataListSelectedActions;
  modelActions: ModelActions;
  query: string;
  setQuery: (query: string) => void;
  filter: DataListFilter;
  setFilter: (filter: DataListFilter) => void;
  onOrderBy: (key: string) => void;
  sortBy: string;
  orderBy: string;
  options: {
    categories?: Categories;
    tags?: Tags;
    types: string[];
    pages: number[];
  };
  keys: {
    order: string[];
    search: string[];
  };
  pagination: DataListPagination;
  rowsLength: number;
}
