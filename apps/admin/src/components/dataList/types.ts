import { Model } from '@model';
import { dataListViewKeys } from './enums';

type DataListView = keyof typeof dataListViewKeys;

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

export interface DataListProps {
  model: Model;
  rowActions: DataListRowAction;
  selectedActions: DataListSelectedActions;
  view?: DataListView;
}

interface ViewCommon {
  test_?: string; // TODO
}

export interface TableViewProps extends ViewCommon {
  test?: string; // TODO
}

export interface FilesViewProps extends ViewCommon {
  test?: string; // TODO
}

export interface IDataListContext {
  model: Model | 'unknown';
  view: DataListView;
}
