import { createContext, useContext } from 'react';

interface AppContextProps {
  pageTitle: string;
  setPageTitle: (pageTitle: string) => void;
}

const defaultContext: AppContextProps = {
  pageTitle: '',
  setPageTitle: () => null,
};

export const AppContext = createContext(defaultContext);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export const useAppContext = () => useContext<AppContextProps>(AppContext);
