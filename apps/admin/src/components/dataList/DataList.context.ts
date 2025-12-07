import { createContext, useContext } from 'react';
import { IDataListContext } from './types';

const defaultDataListContext: IDataListContext = {
  model: 'unknown',
  view: 'table',
};

export const DataListContext = createContext(defaultDataListContext);

export const DataListContextProvider = DataListContext.Provider;
export const DataListContextConsumer = DataListContext.Consumer;

export const useDataListContext = () =>
  useContext<IDataListContext>(DataListContext);
