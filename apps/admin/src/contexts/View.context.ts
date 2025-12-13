import { createContext, useContext } from 'react';
import { IViewContext } from './types';

const defaultContext: IViewContext = {
  model: undefined,
  rootUrl: '',
  list: {
    selected: [],
    setSelected: () => null,
  },
  detail: {
    /* TODO */
  },
  panels: {
    /* TODO */
  },
};

export const ViewContext = createContext(defaultContext);

export const ViewContextProvider = ViewContext.Provider;
export const ViewContextConsumer = ViewContext.Consumer;

export const useViewContext = () => useContext<IViewContext>(ViewContext);
