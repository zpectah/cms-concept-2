import { createContext, useContext } from 'react';
import { IAppContext } from './types';

const defaultContext: IAppContext = {
  pageTitle: '',
  setPageTitle: () => null,
  containerWidth: undefined,
  setContainerWidth: () => null,
};

export const AppContext = createContext(defaultContext);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export const useAppContext = () => useContext<IAppContext>(AppContext);
