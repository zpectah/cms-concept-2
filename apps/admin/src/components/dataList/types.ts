import { ReactNode } from 'react';
import {
  Categories,
  CommonModelItem,
  CommonModelItemProps,
  ModelNames,
  Tags,
} from '@model';
import { ModelActions } from '../../types';
import { dataListSortOrderKeys, dataListViewKeys } from './enums';

export type DataListView = keyof typeof dataListViewKeys;

export type DataListSortOrder = keyof typeof dataListSortOrderKeys;

interface DataListRowAction {
  onDetail?: boolean | ((id: number) => void);
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDeletePermanent?: (id: number) => void;
  // For Articles
  onClone?: (id: number) => void;
  onApprove?: (id: number) => void;
  // For Messages
  onRead?: (id: number) => void;
}

interface DataListSelectedActions {
  onToggleSelected?: (ids: number[]) => void;
  onDeleteSelected?: (ids: number[]) => void;
  onDeletePermanentSelected?: (ids: number[]) => void;
  // For Articles
  onApproveSelected?: (ids: number[]) => void;
  // For Messages
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

export interface UseDataListProps<T extends CommonModelItemProps> {
  items: T[];
  searchKeys: (keyof T)[];
  categories?: Categories;
  tags?: Tags;
  activeOnly: boolean;
  onSelect?: (selected: number[]) => void;
}

export interface UseDataListPaginationProps<T extends CommonModelItemProps> {
  rows: T[];
}

export type UseDataListPaginationReturn<T extends CommonModelItemProps> =
  DataListPagination & {
    rows: T[];
  };

export interface DataListColumnProps<T extends CommonModelItemProps> {
  name: keyof T;
  isTitle?: boolean;
  label?: string;
  renderValue?: (row: T) => ReactNode;
}

export interface DataListProps<T extends CommonModelItem> {
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
  /** Disable toggling between active and deleted items */
  activeOnly?: boolean;
  /** Callback when selected field is changed */
  onSelect?: (selected: number[]) => void;
}

interface ViewCommon<T extends CommonModelItemProps> {
  rows: T[];
  columns: DataListColumnProps<T>[];
}

export type TableViewProps<T extends CommonModelItemProps> = ViewCommon<T>;

export type FilesViewProps<T extends CommonModelItemProps> = ViewCommon<T>;

export interface IDataListContext {
  model: ModelNames | undefined;
  view: DataListView;
  root: string;
  rowActions: DataListRowAction;
  selectedActions: DataListSelectedActions;
  modelActions: ModelActions;
  query: string;
  setQuery: (query: string) => void;
  filter: DataListFilter;
  setFilter: (filter: DataListFilter) => void;
  onFilterReset: () => void;
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
  itemsLength: number;
  activeOnly: boolean;
  showDeleted: boolean;
  onToggleShowDeleted: () => void;
  selected: number[];
  setSelected: (selected: number[]) => void;
  onSelectRow: (id: number) => void;
  onSelectAll: () => void;
  onDeselect: () => void;
  controlsOpen: boolean;
  setControlsOpen: (open: boolean) => void;
}
