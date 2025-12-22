import { ReactNode } from 'react';
import {
  Categories,
  ListModelItem,
  ListModelItemProps,
  ModelNames,
  Tags,
} from '@model';
import { ModelActions } from '../../types';
import { dataListSortOrderKeys, dataListViewKeys } from './enums';

export type DataListView = keyof typeof dataListViewKeys;

export type DataListSortOrder = keyof typeof dataListSortOrderKeys;

interface DataListRowAction {
  // Model common
  onDetail?: boolean | ((id: number) => void);
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDeletePermanent?: (id: number) => void;
  // For Articles only
  onClone?: (id: number) => void;
  onApprove?: (id: number) => void;
  // For Messages only
  onRead?: (id: number) => void;
  // For files only
  onDownload?: (id: number) => void;
}

interface DataListSelectedActions {
  // Model common
  onToggleSelected?: (ids: number[]) => void;
  onDeleteSelected?: (ids: number[]) => void;
  onDeletePermanentSelected?: (ids: number[]) => void;
  // For Articles only
  onApproveSelected?: (ids: number[]) => void;
  // For Messages only
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

export interface UseDataListProps<T extends ListModelItem> {
  items: T[];
  searchKeys: (keyof T)[];
  categories?: Categories;
  tags?: Tags;
  activeOnly: boolean;
  onSelect?: (selected: number[]) => void;
}

export interface UseDataListPaginationProps<T extends ListModelItem> {
  rows: T[];
}

export type UseDataListPaginationReturn<T extends ListModelItem> =
  DataListPagination & {
    rows: T[];
  };

export interface DataListColumnProps<T extends ListModelItem> {
  name: keyof T;
  isTitle?: boolean;
  label?: string;
  renderValue?: (row: T) => ReactNode;
}

export interface DataListProps<T extends ListModelItem> {
  /** Model name */
  model: ModelNames | undefined;
  /** View type */
  view?: DataListView;
  /** Url of root list */
  root: string;
  /** Row item actions */
  rowActions: DataListRowAction;
  /** Actions for selected items */
  selectedActions: DataListSelectedActions;
  /** Items by model type */
  items: T[];
  /** Items filtering */
  filter?: {
    /** Raw categories items for filtering */
    categories?: Categories;
    /** Raw tags items for filtering */
    tags?: Tags;
  };
  /** Table columns */
  columns: DataListColumnProps<T>[];
  /** Keys for ordering, sorting and filtering */
  keys: {
    /** Order keys for list ordering */
    order: (keyof T)[];
    /** Search keys for list filtering */
    search: (keyof T)[];
  };
  /** Disable toggling between active and deleted items */
  activeOnly?: boolean;
  /** Callback when selected field is changed */
  onSelect?: (selected: number[]) => void;
}

interface ViewCommon<T extends ListModelItem> {
  rows: ListModelItemProps[];
  columns: DataListColumnProps<T>[];
}

export type TableViewProps<T extends ListModelItem> = ViewCommon<T>;

export type FilesViewProps<T extends ListModelItem> = ViewCommon<T>;

export interface IDataListContext {
  /** Model name, undefined on init */
  model: ModelNames | undefined;
  /** View type (table or files) */
  view: DataListView;
  /** Url of root list */
  root: string;
  /** Row item actions */
  rowActions: DataListRowAction;
  /** Actions for selected items */
  selectedActions: DataListSelectedActions;
  /** Model actions for current user */
  modelActions: ModelActions;
  /** Fulltext search query */
  query: string;
  setQuery: (query: string) => void;
  /** Items filter (type, categories, tags) */
  filter: DataListFilter;
  setFilter: (filter: DataListFilter) => void;
  onFilterReset: () => void;
  /** Ordering and sorting */
  onOrderBy: (key: string) => void;
  sortBy: string;
  orderBy: string;
  /** Options items for filter and pagination */
  options: {
    categories?: Categories;
    tags?: Tags;
    types: string[];
    pages: number[];
  };
  /** Keys for ordering, sorting and filtering */
  keys: {
    order: string[];
    search: string[];
  };
  /** Pagination hook object */
  pagination: DataListPagination;
  /** Length of current rows */
  rowsLength: number;
  /** Length of all rows */
  itemsLength: number;
  /** If we want to show active items only */
  activeOnly: boolean;
  /** If we want to show also deleted items */
  showDeleted: boolean;
  onToggleShowDeleted: () => void;
  /** State of selected items */
  selected: number[];
  setSelected: (selected: number[]) => void;
  onSelectRow: (id: number) => void;
  onSelectAll: () => void;
  onDeselect: () => void;
  /** List control panel */
  controlsOpen: boolean;
  setControlsOpen: (open: boolean) => void;
}
