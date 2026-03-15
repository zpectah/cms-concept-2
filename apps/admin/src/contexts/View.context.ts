import { createContext, useContext } from 'react';
import { IViewContext } from './types';

const defaultContext: IViewContext = {
  model: undefined,
  modelGroup: null,
  rootUrl: '',
  vid: '',
  list: {
    selected: [],
    setSelected: () => null,
  },
  detail: {},
  panels: {},
};

export const ViewContext = createContext(defaultContext);

export const ViewContextProvider = ViewContext.Provider;
export const ViewContextConsumer = ViewContext.Consumer;

export const useViewContext = () => useContext<IViewContext>(ViewContext);
