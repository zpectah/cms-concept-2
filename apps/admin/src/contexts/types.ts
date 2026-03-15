import { ReactNode } from 'react';
import { ContainerProps } from '@mui/material';
import { ModelGroups, ModelNames } from '@model';

export interface IAppContext {
  pageTitle: ReactNode;
  setPageTitle: (pageTitle: ReactNode) => void;
  containerWidth: ContainerProps['maxWidth'];
  setContainerWidth: (width: ContainerProps['maxWidth']) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface ViewContextList {
  selected: number[];
  setSelected: (selected: number[]) => void;
}

export type ViewContextDetail = object;

export type ViewContextPanels = object;

export interface IViewContext {
  model: ModelNames | undefined;
  modelGroup: ModelGroups | null;
  rootUrl: string;
  vid: string;
  list: ViewContextList;
  detail: ViewContextDetail;
  panels: ViewContextPanels;
}
